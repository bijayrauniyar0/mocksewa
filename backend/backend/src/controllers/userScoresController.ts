import { Request, Response } from 'express';
import UserScores from '../models/userScoresModels';
import User from '../models/userModels';
import { Op } from 'sequelize';
import Notification from '../models/notificationModel';
import {
  AggregatedScore,
  LeaderboardQuery,
  Rank,
  ScoreFilter,
} from '../constants/Types/leaderboard';
import MockTest from '../models/mockTestModel';
import redisClient from '../config/redis';

interface CompareAndNotifyParams {
  leaderboardService: LeaderboardService;
  oldRanks: Rank[];
  newRanks: Rank[];
  test: string;
  user: { id: number; name: string };
}
export class LeaderboardService {
  async getUserScores({
    mock_test_id,
    startDate,
    endDate = new Date(),
  }: ScoreFilter): Promise<UserScores[]> {
    const whereClause: any = {
      mock_test_id,
      mode: 'ranked',
    };
    if (startDate !== 'all_time') {
      whereClause.created_at = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      };
    }
    if (startDate === 'all_time' && endDate) {
      whereClause.created_at = {
        [Op.lt]: endDate,
      };
    }

    const userScores = await UserScores.findAll({
      attributes: ['user_id', 'score', 'created_at'],
      where: whereClause,
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
    });
    return userScores;
  }

  aggregateScores = (scores: UserScores[]) => {
    const aggregated: Record<number, AggregatedScore> = {};

    scores.forEach(score => {
      const userId = score.user_id;
      if (!aggregated[userId]) {
        aggregated[userId] = {
          user_id: userId,
          name: score.User.name || 'Unknown',
          total_score: 0,
        };
      }
      aggregated[userId].total_score += score.score;
    });
    return Object.values(aggregated);
  };

  private getRanks = (scores: AggregatedScore[]): Rank[] => {
    const rankedScores = scores
      .sort((a, b) => b.total_score - a.total_score)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
    return rankedScores;
  };

  async getRankedUsers({ mock_test_id, startDate, endDate }: ScoreFilter) {
    const cachedLeaderboard = await this.getCachedLeaderboard(
      mock_test_id?.toString() || '',
    );
    if (cachedLeaderboard) {
      return cachedLeaderboard;
    }
    const allScores = await this.getUserScores({
      mock_test_id,
      startDate,
      endDate,
    });
    const aggregatedScores = this.aggregateScores(allScores);
    return this.getRanks(aggregatedScores);
  }

  async createSurpassedUserNotification(
    users: Rank[],
    test: string,
    actor: { id: number; name: string },
  ) {
    await Promise.all(
      users.map(async (user: Rank) => {
        await Notification.create({
          user_id: user.user_id,
          message: `You have been surpassed by ${actor.name} in ${test}.`,
          type: 'leaderboard',
          actor_id: actor.id,
          meta: {},
        });
      }),
    );
  }

  async getCachedLeaderboard(mock_test_id: string): Promise<Rank[] | null> {
    const cacheKey = `leaderboard:${mock_test_id}`;
    const cachedLeaderboard = await redisClient.get(cacheKey);
    if (cachedLeaderboard) {
      return JSON.parse(cachedLeaderboard);
    }
    return null;
  }
  async setCachedLeaderboard(mock_test_id: string, data: Rank[]) {
    const cacheKey = `leaderboard:${mock_test_id}`;
    await redisClient.set(cacheKey, JSON.stringify(data));
  }
}

const getUserRank = (ranks: Rank[], userId: number) => {
  const rank = ranks.find((rank: Rank) => rank.user_id === userId)?.rank;
  return rank ? rank : ranks.length + 1;
};

const compareAndNotify = async ({
  leaderboardService,
  oldRanks,
  newRanks,
  test,
  user,
}: CompareAndNotifyParams) => {
  const previousRank = getUserRank(oldRanks, user.id);
  const newRank = getUserRank(newRanks, user.id);

  // Users who were previously ranked worse but now surpassed by the user
  const surpassedUsers = oldRanks.filter(
    ({ rank, user_id }) =>
      rank >= newRank && rank <= previousRank && user_id !== user.id,
  );

  if (surpassedUsers.length > 0) {
    await leaderboardService.createSurpassedUserNotification(
      surpassedUsers,
      test,
      user,
    );
  }
};
export const createScoreEntry = async (req: Request, res: Response) => {
  try {
    const {
      mock_test_id,
      score,
      elapsed_time,
      time_limit,
      question_count,
      unanswered_questions,
      section_scores,
      full_marks,
    } = req.body;
    const user = req.user;
    const leaderboardService = new LeaderboardService();

    const oldRanks = await leaderboardService.getRankedUsers({
      mock_test_id,
      startDate: 'all_time',
    });
    await UserScores.create({
      user_id: user.id,
      score,
      mock_test_id,
      elapsed_time,
      time_limit,
      question_count,
      unanswered_questions,
      section_scores,
      full_marks,
    });

    const newRanks = await leaderboardService.getRankedUsers({
      mock_test_id,
      startDate: 'all_time',
    });
    await leaderboardService.setCachedLeaderboard(mock_test_id, newRanks);

    const test = await MockTest.findByPk(mock_test_id);
    await compareAndNotify({
      leaderboardService,
      oldRanks,
      newRanks,
      test: test?.title || '',
      user: {
        id: user.id,
        name: user.name || 'Unknown',
      },
    });

    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getLeaderboard = async (
  req: Request<unknown, unknown, unknown, LeaderboardQuery>,
  res: Response,
) => {
  const { mock_test_id } = req.query;
  const leaderboardService = new LeaderboardService();
  const cachedLeaderboard =
    await leaderboardService.getCachedLeaderboard(mock_test_id);
  if (cachedLeaderboard) {
    res.status(200).json(cachedLeaderboard);
    return;
  }
  // const startDate = getStartDate(filter_by);
  const startDate = 'all_time';

  const twelveHoursAgo = new Date();
  twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);
  try {
    const userRanks = await leaderboardService.getRankedUsers({
      mock_test_id: Number(mock_test_id),
      startDate,
    });
    const previousUserRanks = await leaderboardService.getRankedUsers({
      mock_test_id: Number(mock_test_id),
      startDate,
      endDate: twelveHoursAgo,
    });
    const userIds = userRanks.map(user => user.user_id);
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
      attributes: ['id', 'avatar'],
    });
    const userMap = new Map(users.map(u => [u.id, u.avatar]));
    const prevRankMap = new Map(
      previousUserRanks.map(prev => [prev.user_id, prev.rank]),
    );
    const rankedUserScores = userRanks.map(user => {
      return {
        ...user,
        previous_rank: prevRankMap.get(user.user_id) || null,
        avatar: userMap.get(user.user_id) || null,
      };
    });
    await leaderboardService.setCachedLeaderboard(
      mock_test_id,
      rankedUserScores,
    );
    res.status(200).json(rankedUserScores);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getMockTestsTakenByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const tests = await MockTest.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: UserScores,
          attributes: [],
          where: {
            user_id: userId,
          },
          required: true,
        },
      ],
      group: ['MockTest.id'],
    });
    const testsFlat = tests.map(test => {
      return {
        id: test.id,
        label: test.title,
        value: test.id,
      };
    });

    res.status(200).json(testsFlat);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
