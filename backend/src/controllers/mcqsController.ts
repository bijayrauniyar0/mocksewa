import MCQ from '../models/mcqModels';
import Test from '../models/mockTestModel';
import { Request, Response } from 'express';
import Section from '../models/sectionModel';
import { shuffle } from '../utils/shuffle';
import redisClient from '../config/redis';
import UserScores from '../models/userScoresModels';
import UserAttemptDetail, {
  UserAttemptDetailType,
} from '../models/userAttemptDetailModel';
import sequelize from '../config/database';
import User from '../models/userModels';
import { Op } from 'sequelize';
import Challenge from '../models/challengeModel';
import ChallengeQuestion from '../models/challengeQuestionModel';
import ChallengeParticipant from '../models/challengeParticipantModel';

interface Question {
  id: number;
  section_id: number;
  question: string;
  options: { id: number; value: string }[];
}
class MCQService {
  private test_id: string;
  private question_count: number;
  private cacheKey: string;
  constructor(test_id: string, question_count: number) {
    this.test_id = test_id;
    this.question_count = +question_count;
    this.cacheKey = `test_questions:approved:${this.test_id}:${this.question_count}`;
  }
  async getQuestionsFromCache() {
    const cachedData = await redisClient.get(this.cacheKey);
    if (!cachedData) return null;
    const data: Record<string, any> = JSON.parse(cachedData);
    const cachedSections = data.sections;
    const sectionIds = Object.keys(cachedSections);
    if (sectionIds?.length) {
      const sectionConfig = await Section.findAll({
        where: { id: sectionIds },
      });
      const sectionConfigMap = sectionConfig.reduce(
        (acc, section) => {
          acc[section.id] = {
            name: section.name,
            marks_per_question: section.marks_per_question,
            negative_marking: section.negative_marking,
          };
          return acc;
        },
        {} as Record<number, any>,
      );
      const questionIds = Object.values(cachedSections).flat();
      const questions = await MCQ.findAll({
        where: {
          id: questionIds,
        },
        attributes: ['id', 'section_id', 'question', 'options'],
      });
      const mcqHash = questions.reduce(
        (acc, mcq) => {
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
        },
        {} as Record<number, any[]>,
      );
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
  async getQuestionsFromSectionsAndId() {}
  async getMCQs() {
    const question_count = this.question_count;
    const test_id = this.test_id;

    // const cachedData = await this.getQuestionsFromCache();

    // if (cachedData) {
    //   return cachedData;
    // }
    const test = await Test.findByPk(test_id);
    if (!test) {
      throw new Error('Test not found');
    }

    const sections = await test.getSections({
      joinTableAttributes: [],
      raw: true,
    });
    const sectionIds = sections.map(s => s.id);

    // Get today's challenge questions to exclude them
    const todayStr = new Date().toISOString().split('T')[0];
    const todayChallenges = await Challenge.findAll({
      where: { date: todayStr },
      attributes: ['id'],
    });
    const todayChallengeIds = todayChallenges.map(c => c.id);
    const challengeQuestions = await ChallengeQuestion.findAll({
      where: { challenge_id: todayChallengeIds },
      attributes: ['question_id'],
    });
    const excludedQuestionIds = challengeQuestions.map(cq => cq.question_id);

    const allQuestions = await MCQ.findAll({
      where: {
        section_id: sectionIds,
        status: 'approved',
        id: {
          [Op.notIn]: excludedQuestionIds,
        },
      },
      attributes: ['id', 'section_id', 'question', 'options'],
    });

    const shuffledQuestions = shuffle(allQuestions);
    const sectionQuestionsMap = shuffledQuestions.reduce(
      (acc, q) => {
        if (!acc[q.section_id]) acc[q.section_id] = [];
        acc[q.section_id].push(q);
        return acc;
      },
      {} as Record<number, typeof allQuestions>,
    );

    let actuallyAssigned = 0;
    let runningTotalWeight = 0;
    const questionIds: number[] = [];
    let full_marks = 0;

    const questions: Question[] = sections.flatMap(section => {
      runningTotalWeight += section.question_weight;
      const cumulativeTarget = Math.round(runningTotalWeight * question_count);
      const count = cumulativeTarget - actuallyAssigned;
      actuallyAssigned += count;
      const pool = shuffle(sectionQuestionsMap[section.id]) || [];
      full_marks += count * section.marks_per_question;
      return pool.slice(0, count).map(mcq => {
        questionIds.push(mcq.id);
        return {
          ...mcq.toJSON(),
          options: Object.entries(mcq.options).map(([k, v]) => ({
            id: Number(k),
            value: v,
          })),
        };
      });
    });

    // 7️⃣ Adjust time limit proportionally if question_count differs
    let time_limit = test.time_limit;
    if (+question_count !== question_count) {
      const timeLimitPerQuestion = test.time_limit / test.question_count;
      time_limit = Math.floor(timeLimitPerQuestion * question_count);
    }

    redisClient.set(this.cacheKey, JSON.stringify(questionIds), { EX: 3600 });

    let isUniformMarking = true;
    const firstSection = sections[0];

    const responseSections = sections.map((section, index) => {
      // check marking only for the first section against others
      if (index > 0) {
        if (
          section.marks_per_question !== firstSection.marks_per_question ||
          section.negative_marking !== firstSection.negative_marking
        ) {
          isUniformMarking = false;
        }
      }

      return {
        section_id: section.id,
        name: section.name,
        negative_marking: section.negative_marking,
        marks_per_question: section.marks_per_question,
      };
    });

    // if uniform, just keep the first section
    const normalizedSections = isUniformMarking
      ? [responseSections[0]]
      : responseSections;

    // 9️⃣ Send response
    return {
      title: test.title,
      time_limit,
      questions_count: question_count,
      full_marks,
      sections: normalizedSections,
      questions,
    };
  }
}
export const getMCQs = async (req: Request, res: Response) => {
  const { test_id } = req.params;
  const { question_count: _question_count, mode } = req.query;

  try {
    if (!test_id || !_question_count) {
      res
        .status(400)
        .json({ message: 'test_id and question_count are required' });
      return;
    }

    let question_count = Number(_question_count);
    if (isNaN(question_count) || question_count <= 0) {
      res.status(400).json({ message: 'Invalid question_count value' });
      return;
    }

    if (mode === 'ranked') {
      const test = await Test.findByPk(test_id);
      if (test) {
        question_count = test.question_count; // Enforce fixed question count for ranked mode
      }
    }

    const mcqService = new MCQService(test_id, question_count);
    const mcqData = await mcqService.getMCQs();
    if (mcqData) {
      res.status(200).json(mcqData);
      return;
    }
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

export const createUserScore = async (req: Request, res: Response) => {
  const { user } = req;
  const {
    mock_test_id,
    mode,
    section_scores,
    question_count,
    time_limit,
    full_marks,
    elapsed_time,
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const sectionIds = Object.keys(section_scores).map(Number);

    const questionIds: number[] = [];
    for (const section of Object.values(section_scores)) {
      for (const qId of Object.keys(section as Record<string, any>)) {
        questionIds.push(Number(qId));
      }
    }

    const sectionsMeta = await Section.findAll({
      where: { id: sectionIds },
      attributes: ['id', 'marks_per_question', 'negative_marking'],
      transaction,
    });

    const sectionMetaHash: Record<
      number,
      { marks_per_question: number; negative_marking: number }
    > = {};
    for (const section of sectionsMeta) {
      sectionMetaHash[section.id] = {
        marks_per_question: section.marks_per_question,
        negative_marking: section.negative_marking,
      };
    }

    const mcqs = await MCQ.findAll({
      where: { id: questionIds },
      attributes: ['id', 'answer'],
      transaction,
    });

    const allAnswersHash: Record<number, number | null> = {};
    for (const mcq of mcqs) {
      allAnswersHash[mcq.id] = mcq.answer !== null ? Number(mcq.answer) : null;
    }

    let unansweredQuestionsCount = 0;
    let totalScore = 0;
    const evaluation = { right: 0, wrong: 0, unanswered: 0 };
    const sectionWiseScores: Record<
      number,
      { marks_scored: number; answered_questions: number }
    > = {};
    const attemptDetails: Partial<UserAttemptDetailType>[] = [];

    for (const sectionId of sectionIds) {
      const sectionAnswers = section_scores[sectionId];
      const { marks_per_question, negative_marking } =
        sectionMetaHash[sectionId];

      let marksScoredInSection = 0;
      let answeredQuestionsInSection = 0;

      for (const [questionIdStr, selectedOption] of Object.entries(
        sectionAnswers,
      )) {
        const questionId = Number(questionIdStr);
        const correctAnswer = allAnswersHash[questionId];
        const detail: Partial<UserAttemptDetailType> = {
          question_id: questionId,
        };

        if (selectedOption === null) {
          unansweredQuestionsCount++;
          evaluation.unanswered++;
          detail.status = 'unanswered';
          attemptDetails.push(detail);
          continue;
        }

        if (correctAnswer === null) {
          attemptDetails.push(detail);
          continue;
        }

        detail.selected_option = selectedOption as number;

        if (selectedOption === correctAnswer) {
          totalScore += marks_per_question;
          marksScoredInSection += marks_per_question;
          evaluation.right++;
          detail.status = 'correct';
        } else {
          totalScore -= negative_marking;
          marksScoredInSection -= negative_marking;
          evaluation.wrong++;
          detail.status = 'incorrect';
        }

        answeredQuestionsInSection++;
        attemptDetails.push(detail);
      }

      sectionWiseScores[sectionId] = {
        marks_scored: marksScoredInSection,
        answered_questions: answeredQuestionsInSection,
      };
    }

    const userScore = await UserScores.create(
      {
        user_id: user?.id,
        mock_test_id,
        mode: mode || 'practice',
        score: totalScore,
        section_scores,
        unanswered_questions: unansweredQuestionsCount,
        question_count,
        time_limit,
        full_marks,
        elapsed_time,
      },
      { transaction },
    );

    const attemptDetailsWithUserScoreId = attemptDetails.map(detail => ({
      ...detail,
      user_score_id: userScore.id,
    }));

    await UserAttemptDetail.bulkCreate(attemptDetailsWithUserScoreId, {
      transaction,
    });

    await transaction.commit();

    res.status(201).json({ answers: allAnswersHash, evaluation });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Failed to create user score', error });
  }
};
// export const startMCQSession = async (req: Request, res: Response) => {
//   try {
//     const { test_id, question_count } = req.params;
//     if (!test_id || !question_count) {
//       res
//         .status(400)
//         .json({ message: 'test_id and question_count are required' });
//       return;
//     }
//     const testAttemptKey = `attempt_in_progress:${req.user?.id}`;
//     const existingAttempt = await redisClient.get(testAttemptKey);
//     if (existingAttempt) {

//     }

//     const mcqService = new MCQService(test_id, Number(question_count));
//     const mcqData = await mcqService.getMCQs();
//   } catch {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// New functions to replace stream controller functionality
export const getAllMockTests = async (req: Request, res: Response) => {
  try {
    const mockTests = await Test.findAll({
      attributes: ['id', 'title'],
    });
    res.status(200).json(mockTests);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

export const getMockTestDetails = async (req: Request, res: Response) => {
  const { mock_test_id } = req.params;
  const { question_count } = req.query;

  try {
    if (!mock_test_id) {
      res.status(400).json({ message: 'mock_test_id is required' });
      return;
    }

    const test = await Test.findByPk(mock_test_id);
    if (!test) {
      res.status(404).json({ message: 'Test not found' });
      return;
    }

    const sections = await test.getSections({
      joinTableAttributes: [],
      raw: true,
    });

    let bookmark = false;
    if (req.user) {
      const Bookmark = (await import('../models/bookmarksModel')).default;
      const bookmarks = await Bookmark.findOne({
        where: {
          user_id: req.user.id,
          mock_test_id: +mock_test_id,
        },
      });
      bookmark = !!bookmarks;
    }

    let { time_limit } = test.toJSON();
    if (question_count && Number(question_count) !== test.question_count) {
      const timeLimitPerQuestion = time_limit / test.question_count;
      time_limit = Math.floor(timeLimitPerQuestion * Number(question_count));
    }

    res.status(200).json({
      ...test.toJSON(),
      sections,
      bookmark,
      time_limit,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const { mock_test_id } = req.params;

    if (!mock_test_id) {
      res.status(400).json({ message: 'Mock test ID is required' });
      return;
    }

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const activeUsersQuery = await UserScores.count({
      where: {
        mock_test_id: mock_test_id,
        created_at: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      distinct: true,
      col: 'user_id',
    });

    const testsCompletedQuery = await UserScores.count({
      where: {
        mock_test_id: mock_test_id,
        created_at: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
    });

    const avgScoreResult = (await UserScores.findOne({
      where: {
        mock_test_id: mock_test_id,
        created_at: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('score')), 'averageScore'],
        [sequelize.fn('AVG', sequelize.col('full_marks')), 'averageFullMarks'],
      ],
      raw: true,
    })) as any;

    // Calculate average percentage
    let averageScorePercentage = 0;
    if (
      avgScoreResult &&
      avgScoreResult.averageScore &&
      avgScoreResult.averageFullMarks
    ) {
      averageScorePercentage = Math.round(
        (Number(avgScoreResult.averageScore) /
          Number(avgScoreResult.averageFullMarks)) *
          100,
      );
    }

    // Get recent 3 completions with user details
    const recentCompletions = await UserScores.findAll({
      where: {
        mock_test_id: mock_test_id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'score', 'full_marks', 'created_at', 'user_id'],
      order: [['created_at', 'DESC']],
      limit: 3,
    });

    // Format recent completions
    const formattedCompletions = recentCompletions.map(completion => {
      const scorePercentage = Math.round(
        (completion.score / completion.full_marks) * 100,
      );
      const timeAgo = getTimeAgo(completion.created_at);

      return {
        id: completion.id,
        userName: completion.User?.name || 'Anonymous User',
        scorePercentage: scorePercentage,
        timeAgo: timeAgo,
      };
    });

    res.status(200).json({
      activeUsersToday: activeUsersQuery,
      testsCompletedIn24h: testsCompletedQuery,
      averageScoreToday: averageScorePercentage,
      recentCompletions: formattedCompletions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return `${Math.floor(diffInDays / 7)}w ago`;
}

// Daily Challenge Controllers
export const getDailyChallenge = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Check if user has previous score entry
    const lastScore = await UserScores.findOne({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
    });

    if (!lastScore) {
      res.status(403).json({
        message:
          'No previous attempts found. Complete a mock test first to unlock daily challenges.',
      });
      return;
    }

    // 2. Determine subject from last attempt
    const lastMockTest = await Test.findByPk(lastScore.mock_test_id);
    if (!lastMockTest) {
      res.status(404).json({ message: 'Previous test data not found' });
      return;
    }

    const sections = await lastMockTest.getSections();
    if (!sections || sections.length === 0) {
      res.status(404).json({ message: 'No subjects found for previous test' });
      return;
    }

    const subject = sections[0]; // Use first section as subject
    const subject_id = subject.id;

    // 3. Redis Cache Check
    const cacheKey = `daily_challenge:${todayStr}:${subject_id}`;
    const cachedData = await redisClient.get(cacheKey);

    let challengeData: any;
    if (cachedData) {
      challengeData = JSON.parse(cachedData);
    } else {
      // 4. Find or Create Challenge in DB
      let dbChallenge = await Challenge.findOne({
        where: { date: todayStr, subject_id },
      });

      if (!dbChallenge) {
        // Find 10 random questions for this subject
        const questions = await MCQ.findAll({
          where: { section_id: subject_id, status: 'approved' },
          order: sequelize.random(),
          limit: 10,
        });

        if (questions.length === 0) {
          res
            .status(403)
            .json({ message: 'Not enough questions for this subject' });
          return;
        }

        dbChallenge = await Challenge.create({
          title: `Daily Challenge - ${subject.name} - ${todayStr}`,
          date: todayStr,
          subject_id,
          total_questions: questions.length,
          time_limit: 600, // 10 minutes
        });

        if (dbChallenge) {
          await ChallengeQuestion.bulkCreate(
            questions.map(q => ({
              challenge_id: (dbChallenge as Challenge).id,
              question_id: q.id,
            })),
          );
        }
      }

      // Fetch with questions
      const finalChallenge = await Challenge.findOne({
        where: { id: dbChallenge.id },
        include: [
          {
            model: MCQ,
            attributes: ['id', 'question', 'options', 'section_id'],
            through: { attributes: [] },
          },
        ],
      });

      if (!finalChallenge) {
        res.status(500).json({ message: 'Failed to retrieve challenge' });
        return;
      }

      const rawChallenge = finalChallenge.toJSON();
      // Transform options format if necessary (similar to getMCQs)
      rawChallenge.MCQs = rawChallenge.MCQs.map((q: any) => ({
        ...q,
        options: Object.entries(q.options).map(([k, v]) => ({
          id: Number(k),
          value: v,
        })),
      }));

      challengeData = rawChallenge;

      // Cache for the rest of the day
      const secondsUntilMidnight = Math.floor(
        (new Date(new Date().setHours(24, 0, 0, 0)).getTime() - Date.now()) /
          1000,
      );
      await redisClient.set(cacheKey, JSON.stringify(challengeData), {
        EX: secondsUntilMidnight > 0 ? secondsUntilMidnight : 3600,
      });
    }

    // 5. Check user participation
    const participation = await ChallengeParticipant.findOne({
      where: { challenge_id: challengeData.id, user_id: user.id },
    });

    res.status(200).json({
      challenge: challengeData,
      participated: !!participation,
      participation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const submitChallengeScore = async (req: Request, res: Response) => {
  const { user } = req;
  const { challenge_id, score, elapsed_time } = req.body;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // Check if already attempted
    const existing = await ChallengeParticipant.findOne({
      where: { challenge_id, user_id: user.id },
    });

    if (existing) {
      res.status(400).json({ message: 'Challenge already attempted today' });
      return;
    }

    const participant = await ChallengeParticipant.create({
      challenge_id,
      user_id: user.id,
      score,
      elapsed_time,
      attempted_at: new Date(),
    });

    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
