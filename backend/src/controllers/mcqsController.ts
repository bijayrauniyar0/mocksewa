import MCQ from '../models/mcqModels';
import Test from '../models/mockTestModel';
import { Request, Response } from 'express';
import { StreamsService } from './streamController';
import Section from '../models/sectionModel';
import { shuffle } from '../utils/shuffle';
import redisClient from '../config/redis';

class MCQService {
  async getQuestionsFromCache(cachedData: string) {
    const data: Record<string, any> = JSON.parse(cachedData);
    const cachedSections = data.sections;
    const sectionIds = Object.keys(cachedSections);
    if (sectionIds?.length) {
      const sectionConfig = await Section.findAll({
        where: { id: sectionIds },
      });
      const sectionConfigMap = sectionConfig.reduce((acc, section) => {
        acc[section.id] = {
          name: section.name,
          marks_per_question: section.marks_per_question,
          negative_marking: section.negative_marking,
        };
        return acc;
      }, {} as Record<number, any>);
      const questionIds = Object.values(cachedSections).flat();
      const questions = await MCQ.findAll({
        where: {
          id: questionIds,
        },
        attributes: ['id', 'section_id', 'question', 'options'],
      });
      const mcqHash = questions.reduce((acc, mcq) => {
        acc[mcq.section_id] = [
          ...(acc[mcq.section_id] || []),
          {
            ...mcq.toJSON(),
            options: Object.entries(mcq.options).map(([key, value]) => ({
              id: Number(key),
              value,
            })),
          },
        ];
        return acc;
      }, {} as Record<number, any[]>);
      const mcqSections = sectionIds.map(sectionId => {
        return {
          section_id: Number(sectionId),
          question_count: mcqHash[Number(sectionId)].length,
          ...sectionConfigMap[Number(sectionId)],
          questions: mcqHash[Number(sectionId)],
        };
      });

      return {
        questions_count: +data.meta?.questions_count,
        time_limit: data.meta?.time_limit,
        sections: mcqSections,
        title: data.meta?.title,
      };
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

    const cacheKey = `test_questions:approved:${test_id}:${total_question_count}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      const mcqData = await new MCQService().getQuestionsFromCache(cachedData);
      if (mcqData) {
        res.status(200).json(mcqData);
        return;
      }
    }

    const streamsService = new StreamsService();
    const { sections } =
      await streamsService.getTestsMetaDataAccordingToSection(test_id);
   // 2️⃣ Fetch all approved questions for these sections
    const sectionIds = sections.map(s => s.id);

    const allQuestions = await MCQ.findAll({
      where: {
        section_id: sectionIds,
        status: 'approved',
      },
    });

    // 3️⃣ Group questions by section_id (O(Q))
    const sectionQuestionsMap = allQuestions.reduce((acc, q) => {
      if (!acc[q.section_id]) acc[q.section_id] = [];
      acc[q.section_id].push(q);
      return acc;
    }, {} as Record<number, typeof allQuestions>);

    // Shuffle each section once
    for (const sectionId in sectionQuestionsMap) {
      sectionQuestionsMap[sectionId] = shuffle(sectionQuestionsMap[sectionId]);
    }

    // 4️⃣ Calculate initial counts per section
    let assignedCount = 0;
    const sectionCounts = sections.map(section => {
      const count = Math.round(section.question_weight * total_question_count);
      assignedCount += count;
      return { section, count };
    });

    // 5️⃣ Adjust counts to exactly match total_question_count
    let diff = total_question_count - assignedCount;
    const validSections = sectionCounts.filter(sc => sc.section.question_weight > 0);
    let i = 0;
    while (diff !== 0 && validSections.length) {
      const sc = validSections[i % validSections.length];

      if (diff > 0) {
        sc.count++;
        diff--;
      } else if (diff < 0 && sc.count > 0) {
        sc.count--;
        diff++;
      }

      i++;
    }

    // 6️⃣ Prepare cache data
    const cacheData: Record<string, any> = { sections: {}, meta: {} };

    const mcq_sections = sectionCounts.map(({ section, count }) => {
      const questions = sectionQuestionsMap[section.id] || [];
      const selected = questions.slice(0, count);

      cacheData.sections[section.id] = selected.map(q => q.id);

      const { id: _id, question_weight: _w, ...sectionData } = section;

      return {
        section_id: section.id,
        question_count: count,
        ...sectionData,
        questions: selected.map(mcq => ({
          ...mcq.toJSON(),
          options: Object.entries(mcq.options).map(([key, value]) => ({
            id: Number(key),
            value,
          })),
        })),
      };
    });

    // 7️⃣ Adjust time limit proportionally if question_count differs
    let time_limit = test.time_limit;
    if (+question_count !== total_question_count) {
      const timeLimitPerQuestion = test.time_limit / test.question_count;
      time_limit = Math.floor(timeLimitPerQuestion * total_question_count);
    }

    // 8️⃣ Cache in Redis
    redisClient.set(
      cacheKey,
      JSON.stringify({
        ...cacheData,
        meta: {
          time_limit,
          questions_count: total_question_count,
          title: test.title,
        },
      }),
      { EX: 3600 },
    );

    // 9️⃣ Send response
    res.status(200).json({
      questions_count: total_question_count,
      time_limit,
      sections: mcq_sections,
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
