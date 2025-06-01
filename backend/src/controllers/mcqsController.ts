import MCQ from '../models/mcqModels';
import Test from '../models/mockTestModel';
import { Request, Response } from 'express';
import sequelize from '../config/database';
import { StreamsService } from './streamController';
import Section from '../models/sectionModel';

export class MCQsService {
  async getMCQs(section_id: number, question_count: number) {
    try {
      const section = await Section.findByPk(section_id);
      if (!section) {
        throw new Error('Section not found');
      }
      const mcq_questions = await MCQ.findAll({
        where: { section_id: section_id },
        limit: question_count,
        order: sequelize.random(),
        raw: true,
      });
      return mcq_questions;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
export const getMCQs = async (req: Request, res: Response) => {
  const { test_id } = req.params;
  const { question_count } = req.query;

  try {
    if (!test_id || !question_count) {
      res
        .status(400)
        .json({ message: 'test_id and question_count are required' });
      return;
    }

    const total_question_count = Number(question_count);
    if (isNaN(total_question_count) || total_question_count <= 0) {
      res.status(400).json({ message: 'Invalid question_count value' });
      return;
    }

    const test = await Test.findByPk(test_id);
    if (!test) {
      res.status(404).json({ message: 'Test not found' });
      return;
    }

    const streamsService = new StreamsService();
    const { sections } =
      await streamsService.getTestsMetaDataAccordingToSection(test_id);

    // Step 1: Calculate rounded counts per section
    const sectionCounts = sections.map(section => ({
      section,
      count: Math.round(section.question_weight * total_question_count),
    }));

    // Step 2: Sum assigned counts
    const assignedCount = sectionCounts.reduce((acc, sc) => acc + sc.count, 0);

    // Step 3: Adjust counts randomly to match total_question_count exactly
    let diff = total_question_count - assignedCount;

    while (diff !== 0) {
      // Filter sections with weight > 0 (eligible for adjustment)
      const candidates = sectionCounts.filter(
        sc => sc.section.question_weight > 0,
      );
      if (candidates.length === 0) break;

      const randomIndex = Math.floor(Math.random() * candidates.length);
      const chosen = candidates[randomIndex];

      if (diff > 0) {
        chosen.count += 1;
        diff -= 1;
      } else if (diff < 0 && chosen.count > 0) {
        chosen.count -= 1;
        diff += 1;
      }
    }

    const mcqService = new MCQsService();

    // Step 4: Fetch questions per section with adjusted counts
    const mcq_questions = await Promise.all(
      sectionCounts.map(async ({ section, count }) => {
        try {
          const mcq_question = await mcqService.getMCQs(section.id, count);
          // eslint-disable-next-line no-unused-vars
          const { id, question_weight: _, ...restSectionData } = section;

          return {
            section_id: id,
            ...restSectionData,
            question_count: count,
            questions: (mcq_question ?? []).map(mcq => ({
              ...mcq,
              options: Object.entries(mcq.options).map(([key, value]) => ({
                id: Number(key),
                value,
              })),
            })),
          };
        } catch {
          return {
            section_id: section.id,
            question_count: 0,
            questions: [],
            ...section,
          };
        }
      }),
    );
    let time_limit = test.time_limit;
    if (question_count && +question_count !== total_question_count) {
      const timeLimitPerQuestion = test.time_limit / test.question_count;
      time_limit = Math.floor(timeLimitPerQuestion * total_question_count);
    }

    res.status(200).json({
      questions_count: total_question_count,
      time_limit,
      sections: mcq_questions,
      title: test.title,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getMCQsAnswers = async (req: Request, res: Response) => {
  const { questions } = req.query;
  try {
    const mcqAnswers = await MCQ.findAll({
      attributes: ['id', 'answer', 'section_id'],
      where: {
        id: (questions as string)?.split(','),
      },
    });
    const mcqAnswersArray = mcqAnswers.map(mcq => {
      return {
        id: Number(mcq.id),
        answer: Number(mcq.answer),
        section_id: Number(mcq.section_id),
      };
    });
    res.status(200).json(mcqAnswersArray);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
