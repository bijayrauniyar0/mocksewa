/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { LeaderboardService } from './userScoresController';
import UserScores from '../models/userScoresModels';
import { Op, Sequelize } from 'sequelize';
import { formatToMinSec, getStartDateByTimePeriod } from '../utils/index';
import {
  IGetUserStatsParamType,
  IPerformanceDetails,
  IRecentSessions,
  UserScoresArgsType,
} from '../constants/Types/userStats';
import MockTest from '../models/mockTestModel';
import {
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  startOfMonth,
} from 'date-fns';
import User from '../models/userModels';
import Section from '../models/sectionModel';
import { format } from 'date-fns';
import { paginate } from '../utils/paginate';
// import User from '@Models/userModels';

export async function seedUserScores(count: number = 100) {
  const oneWeekAgo = new Date();
  const startDate = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - 15));
  const endDate = new Date();
  const getRandomDate = () => {
    const diff = endDate.getTime() - startDate.getTime();
    return new Date(startDate.getTime() + Math.random() * diff);
  };

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  try {
    const users = await User.findAll({
      attributes: ['id'],
      raw: true,
    });
    const userIds = users.map(user => user.id);
    const mockTest = await MockTest.findAll({
      attributes: ['id'],
    });
    const mockTestIds = mockTest.map(test => test.id);
    const api_url = 'https://zenquotes.io/api/quotes/';

    // create scores

    const records = Array.from({ length: count }).map(() => {
      const user_id = userIds[getRandomInt(0, userIds.length - 1)];
      const mock_test_id = mockTestIds[getRandomInt(0, mockTestIds.length - 1)];
      return {
        user_id,
        score: getRandomInt(1, 10),
        created_at: getRandomDate(),
        elapsed_time: getRandomInt(200, 600),
        question_count: 10,
        unanswered_questions: 0,
        full_marks: 10,
        time_limit: 10,
        mock_test_id: 4,
      };
    });

    await UserScores.bulkCreate(records);
  } catch (error) {
    throw new Error('Error seeding user scores:');
  }
}

export class UserStatsService {
  private user_id: number;

  constructor(userId: number) {
    this.user_id = userId;
  }
  async getUserScores({
    startDate,
    otherFilterOptions,
    mock_test_id,
    mode,
  }: UserScoresArgsType): Promise<UserScores[]> {
    const whereClause: any = {
      user_id: this.user_id,
    };
    if (mock_test_id) {
      whereClause.mock_test_id = mock_test_id;
    }
    if (startDate !== 'all_time') {
      whereClause.created_at = {
        [Op.gte]: startDate,
      };
    }
    // Filter by mode
    if (mode) {
      whereClause.mode = mode;
    }
    const userScores = await UserScores.findAll({
      where: whereClause,
      attributes: {
        exclude: ['user_id', 'mock_test_id'],
      },
      include: [
        {
          model: MockTest,
          attributes: ['title', 'time_limit'],
        },
      ],
      order: [['created_at', 'DESC']],
      ...otherFilterOptions,
    });
    return userScores;
  }

  async getRecentSessions(
    dataLimit: number = 5,
    mode?: 'practice' | 'ranked',
  ): Promise<IRecentSessions[]> {
    try {
      const userScores = await this.getUserScores({
        startDate: 'all_time',
        mode,
        otherFilterOptions: {
          limit: dataLimit,
          raw: false,
        },
      });
      const scores = userScores.map(score => {
        const { MockTest, ...scoreData } = score.get();
        return {
          ...scoreData,
          elapsed_time: scoreData.elapsed_time,
          title: `${MockTest.title}`,
          test: MockTest.title,
        };
      });
      return scores;
    } catch (error) {
      throw new Error('Error fetching recent sessions: ' + error);
    }
  }
  // async getUserPerformanceDetails({
  //   time_period,
  //   page = 1,
  //   page_size = 15,
  //   sort_by = 'created_at',
  //   sort_order = 'desc',
  //   mock_test_id,
  // }: Pick<IGetUserStatsParamType, 'time_period'> & {
  //   page?: number;
  //   page_size?: number;
  //   sort_by?: keyof IPerformanceDetails;
  //   sort_order?: 'asc' | 'desc';
  //   mock_test_id: number;
  // }): Promise<{
  //   results: IPerformanceDetails[];
  //   total: number;
  //   page: number;
  //   next_page: number | null;
  // }> {
  //   const leaderboardService = new LeaderboardService();

  //   const startDate = getStartDateByTimePeriod(time_period);
  //   const allScoresData = await this.getUserScores({
  //     startDate,
  //     mock_test_id: Number(mock_test_id),
  //     controllerName: 'getUserPerformanceDetails',
  //   });

  //   const total = allScoresData.length;
  //   const offset = (page - 1) * page_size;

  //   // Sort
  //   const validSortFields = ['elapsed_time', 'score', 'created_at'] as const;
  //   const sortField = validSortFields.includes(sort_by as any)
  //     ? sort_by
  //     : 'created_at';

  //   const sortedScores = allScoresData.sort((a, b) => {
  //     const aVal = a.get?.()[sortField];
  //     const bVal = b.get?.()[sortField];

  //     if (aVal == null || bVal == null) return 0;
  //     return sort_order === 'asc' ? aVal - bVal : bVal - aVal;
  //   });

  //   const scoresData = sortedScores.slice(offset, offset + page_size);

  //   const userScoresStack: IPerformanceDetails[] = [];

  //   const performanceDetails = await Promise.all(
  //     scoresData.map(async (scoreModel, index) => {
  //       const { MockTest, ...score } = scoreModel.get();
  //       const response: IPerformanceDetails = {
  //         ...score,
  //         test: MockTest?.title,
  //         date: score.created_at,
  //         elapsed_time: formatToMinSec(score.elapsed_time),
  //         title: `${score.mode} #${score.id}`,
  //         accuracy: `${((score.score / 10) * 100).toFixed(2)} %`,
  //         rank_change: 'N/A',
  //       };

  //       const userRank = await leaderboardService.getRankedUsers({
  //         startDate,
  //         endDate: new Date(
  //           new Date(score.created_at).getTime() - 24 * 60 * 60 * 1000,
  //         ),
  //         mock_test_id,
  //       });

  //       const userScoreDetail = userRank.find(
  //         (user: any) => user.id === this.user_id,
  //       );

  //       const updatedResponse = {
  //         ...response,
  //         rank_change:
  //           (userScoreDetail?.rank ?? 0) -
  //           Number(userScoresStack[index - 1]?.rank_change ?? 0),
  //       };

  //       userScoresStack.push(updatedResponse);
  //       return updatedResponse;

  //       // return response;
  //     }),
  //   );

  //   return {
  //     results: performanceDetails,
  //     total,
  //     page,
  //     next_page: offset + page_size < total ? page + 1 : null,
  //   };
  // }
  getUserStats = async ({
    mock_test_id,
    leaderboardService,
    time_period,
    mode,
  }: {
    mock_test_id: number;
    leaderboardService: LeaderboardService;
    time_period?: string | undefined;
    mode?: 'practice' | 'ranked';
  }) => {
    const scores = await this.getUserScores({
      startDate: time_period
        ? getStartDateByTimePeriod(time_period)
        : 'all_time',
      mock_test_id,
      mode,
    });

    const userRanks = await leaderboardService.getRankedUsers({
      startDate: 'all_time',
      mock_test_id,
    });

    const totalScore = scores.reduce((acc, score) => acc + score.score, 0);
    const totalQuestions = scores.reduce(
      (acc, score) => acc + (score.question_count || 0),
      0,
    );
    const totalFullMarks = scores.reduce(
      (acc, score) => acc + (score.full_marks || 0),
      0,
    );
    const avg_accuracy = totalFullMarks
      ? +((totalScore / totalFullMarks) * 100).toFixed(2)
      : 0;

    return {
      score: totalScore,
      avg_accuracy: avg_accuracy ? `${avg_accuracy}%` : 'N/A',
      total_sessions: scores.length,
      total_questions: totalQuestions,
      current_rank: userRanks.find((u: any) => u.user_id === this.user_id)
        ?.rank,
    };
  };
}

export const getUserStats = async (
  req: Request<unknown, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  // seedUserScores(500);
  const { time_period, mock_test_id, mode } = req.query as any;
  const { user } = req;
  const leaderboardService = new LeaderboardService();
  const userStatsService = new UserStatsService(user.id);
  if (!mock_test_id) {
    res.status(400).end('Mock test id is required');
    return;
  }
  try {
    const stats = await userStatsService.getUserStats({
      mock_test_id: Number(mock_test_id),
      leaderboardService,
      time_period,
      mode,
    });
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getUserStatsById = async (
  req: Request<{ user_id: string }, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  const { user_id } = req.params;
  const { mock_test_id } = req.query;
  const leaderboardService = new LeaderboardService();
  const userStatsService = new UserStatsService(+user_id);
  if (!mock_test_id) {
    res.status(400).end('Mock test id is required');
    return;
  }
  if (!user_id) {
    res.status(400).end('User id is required');
    return;
  }
  try {
    const stats = await userStatsService.getUserStats({
      mock_test_id: Number(mock_test_id),
      leaderboardService,
      mode: req.query.mode as any,
    });
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getRadarMetrics = async (
  req: Request<{ user_id: string }, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  const { user_id } = req.params;
  const { mock_test_id, mode } = req.query as any;

  if (!mock_test_id) {
    res.status(400).send('Mock test id is required');
    return;
  }
  if (!user_id) {
    res.status(400).send('User id is required');
    return;
  }

  try {
    const userStatsService = new UserStatsService(+user_id);
    const maxTestsTakenInSubject = 10;
    const maxTimeRatio = 1.5;

    const userAttempts = await userStatsService.getUserScores({
      startDate: 'all_time',
      mock_test_id: Number(mock_test_id),
      mode,
    });

    if (userAttempts.length === 0) {
      res.status(200).json([]);
      return;
    }
    const sortedAttempts = [...userAttempts].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    let totalScore = 0;
    let totalFullMarks = 0;
    let totalElapsedTime = 0;
    let totalTimeGiven = 0;
    let totalUnansweredQuestions = 0;
    let totalQuestions = 0;

    for (const attempt of userAttempts) {
      totalScore += attempt.score;
      totalFullMarks += attempt.full_marks;
      totalElapsedTime += attempt.elapsed_time;
      totalTimeGiven += attempt.time_limit * 60;
      totalUnansweredQuestions += attempt.unanswered_questions;
      totalQuestions += attempt.question_count;
    }

    // Accuracy %
    const accuracy = (totalScore / totalFullMarks) * 100;
    // Average Elapsed Time (inverted, clamped)
    const avgElapsedRatio = totalElapsedTime / totalTimeGiven;
    const clampedTimeRatio = Math.min(avgElapsedRatio, maxTimeRatio);
    const normElapsedTime = ((maxTimeRatio - clampedTimeRatio) / 1.0) * 100;

    // Tests Taken (normalized)
    const testsTaken = userAttempts.length;
    const normTestsTaken = Math.min(
      100,
      (testsTaken / maxTestsTakenInSubject) * 100,
    );

    // Improvement Rate
    const getDerivedScore = (attempt: (typeof userAttempts)[0]) => {
      return attempt.score / attempt.question_count;
    };
    const improvementRate =
      (getDerivedScore(sortedAttempts[sortedAttempts.length - 1]) -
        getDerivedScore(sortedAttempts[0])) *
      100;
    const normImprovement = Math.max(
      0,
      Math.min(100, (improvementRate + 100) / 2),
    );

    // Average Unanswered Questions (%)
    const avgUnansweredQuestions =
      (totalUnansweredQuestions / totalQuestions) * 100;

    // Final Radar Metrics
    const radarMetrics = {
      accuracy: Number(accuracy.toFixed(2)),
      avg_elapsed_time: Number(normElapsedTime.toFixed(2)),
      tests_taken: Number(normTestsTaken.toFixed(2)),
      improvement_rate: Number(normImprovement.toFixed(2)),
      avg_unanswered_questions: Number(avgUnansweredQuestions.toFixed(2)),
    };

    res.status(200).json(radarMetrics);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getRecentSessions = async (req: Request, res: Response) => {
  const { user } = req;
  const { mode } = req.query as any;

  const userStatsService = new UserStatsService(user.id);
  try {
    const scoresData = await userStatsService.getRecentSessions(3, mode);
    res.status(200).json(scoresData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getPerformanceDetails = async (
  req: Request<unknown, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  const { page = 1, page_size = 15, mock_test_id, mode } = req.query;
  const { user } = req;

  if (!mock_test_id) {
    res.status(400).json({ message: 'Mock test id is required' });
    return;
  }

  try {
    const userScoresData = await paginate(
      UserScores,
      {
        where: {
          user_id: user.id,
          mock_test_id: Number(mock_test_id),
          ...(mode ? { mode } : {}),
        },
        attributes: [
          'id',
          'score',
          'elapsed_time',
          'created_at',
          'full_marks',
          'unanswered_questions',
          // Include only necessary fields
          [
            // Calculate accuracy in DB
            Sequelize.literal('(score::float / "full_marks"::float) * 100'),
            'accuracy',
          ],
        ],
        order: [['created_at', 'DESC']],
      },
      {
        page: +page,
        page_size: +page_size,
      },
    );

    res.status(200).json({ ...userScoresData });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getPerformanceTrend = async (
  req: Request<unknown, unknown, unknown, { filter_by: string }>,
  res: Response,
) => {
  const { filter_by, mock_test_id, mode } = req.query as any;
  const { user } = req;

  try {
    const now = new Date();

    let getStartDate: (amount: number) => Date;
    let rangeLabelFormat: Intl.DateTimeFormatOptions;
    const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 0 }); // Week starts on Sunday (0) or Monday (1)
    const startOfCurrentMonth = startOfMonth(now); // Start of the current month
    switch (filter_by) {
      case 'last_3_weeks':
        getStartDate = amount => subWeeks(startOfCurrentWeek, amount);
        rangeLabelFormat = { month: 'short', day: 'numeric' };
        break;
      case 'last_3_months':
        getStartDate = amount => subMonths(startOfCurrentMonth, amount);
        rangeLabelFormat = { month: 'short' };
        break;
      default:
        getStartDate = amount => subDays(new Date(), amount);
        rangeLabelFormat = { month: 'short', day: 'numeric' };
    }

    const rangeStarts = [getStartDate(3), getStartDate(2), getStartDate(1)];

    const scores = await UserScores.findAll({
      where: {
        user_id: user.id,
        ...(mock_test_id ? { mock_test_id: Number(mock_test_id) } : {}),
        ...(mode ? { mode } : {}),
        created_at: {
          [Op.gte]: rangeStarts[0],
        },
      },
      raw: true,
      attributes: [
        'score',
        'elapsed_time',
        'created_at',
        'full_marks',
        'question_count',
      ],
      order: [['created_at', 'ASC']],
    });

    const stats = [
      {
        total_score: 0,
        total_time: 0,
        total_full_marks: 0,
        total_questions: 0,
        count: 0,
      }, // oldest
      {
        total_score: 0,
        total_time: 0,
        total_full_marks: 0,
        total_questions: 0,
        count: 0,
      },
      {
        total_score: 0,
        total_time: 0,
        total_full_marks: 0,
        total_questions: 0,
        count: 0,
      }, // most recent
    ];

    for (const score of scores) {
      const createdAt = new Date(score.created_at);
      let targetIndex = 0;

      if (createdAt >= rangeStarts[2]) {
        targetIndex = 2;
      } else if (createdAt >= rangeStarts[1]) {
        targetIndex = 1;
      } else {
        targetIndex = 0;
      }

      Object.assign(stats[targetIndex], {
        total_score: stats[targetIndex].total_score + score.score,
        total_time: stats[targetIndex].total_time + score.elapsed_time,
        total_full_marks:
          stats[targetIndex].total_full_marks + (score.full_marks || 0),
        total_questions:
          stats[targetIndex].total_questions + (score.question_count || 0),
        count: stats[targetIndex].count + 1,
      });
    }

    const formatStats = (data: (typeof stats)[0], start: Date, end: Date) => {
      return {
        label: `${start.toLocaleDateString(undefined, rangeLabelFormat)} ${
          filter_by === 'last_3_months'
            ? ''
            : `- ${end.toLocaleDateString(undefined, rangeLabelFormat)}`
        }`,
        avg_score: data.count ? +(data.total_score / data.count).toFixed(2) : 0,
        avg_elapsed_time: data.count
          ? +(data.total_time / data.count / 60).toFixed(2)
          : 0,
        avg_accuracy: data.total_full_marks
          ? +((data.total_score / data.total_full_marks) * 100).toFixed(2)
          : 0,
        total_questions: data.total_questions,
        total_sessions: data.count,
      };
    };

    const results = [
      formatStats(stats[0], rangeStarts[0], rangeStarts[1]),
      formatStats(stats[1], rangeStarts[1], rangeStarts[2]),
      formatStats(stats[2], rangeStarts[2], new Date()),
    ];

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getUserScoresByMockTest = async (
  req: Request<{ user_id: string }, unknown, unknown, { mock_test_id: string }>,
  res: Response,
) => {
  const { user_id } = req.params;
  const { mock_test_id } = req.query;
  if (!mock_test_id) {
    res.status(400).end('Mock test id is required');
    return;
  }
  if (!user_id) {
    res.status(400).end('User id is required');
    return;
  }
  try {
    const userStatsService = new UserStatsService(+user_id);
    const scores = await userStatsService.getUserScores({
      startDate: 'all_time',
      mock_test_id: Number(mock_test_id),
    });
    const scoreMap: Record<string, number> = {};

    for (const s of scores) {
      const date = format(new Date(s.created_at), 'yyyy-MM-dd');
      scoreMap[date] = (scoreMap[date] || 0) + s.score;
    }

    const dailyScores = Object.entries(scoreMap)
      .map(([date, total_score]) => ({ date, total_score }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.status(200).json(dailyScores);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getHistorySessions = async (
  req: Request<
    { user_id: string },
    unknown,
    unknown,
    { mock_test_id: string; page_size?: string; page?: string }
  >,
  res: Response,
) => {
  const { page_size = '15', page = '1' } = req.query;
  const { user_id } = req.params;

  try {
    const scores = await paginate(
      UserScores,
      {
        where: {
          user_id,
        },
        attributes: ['id', 'score', 'elapsed_time', 'created_at'],
        include: [
          {
            model: MockTest,
            attributes: ['title'],
          },
        ],
        order: [['created_at', 'DESC']],
      },
      {
        page: +page,
        page_size: +page_size,
      },
    );
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
