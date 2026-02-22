// src/controllers/chatController.ts
import Discussion from '../models/discussionModel';
import { Request, Response } from 'express';
import { paginate } from '../utils/paginate';
import redisClient from '../config/redis';
import sequelize from '../config/database';
import User from '../models/userModels';
export const getUsersInChat = async (req: Request, res: Response) => {
  try {
    const { mock_test_id } = req.params;
    const redisKey = `mock_test:${mock_test_id}:users`;
    const { user } = req;

    // Try to get from cache

    const cachedData = await redisClient.hGetAll(redisKey);
    const users: User[] = [];
    if (cachedData) {
      Object.values(cachedData).forEach(u => {
        const parsedUser = JSON.parse(u);
        if (parsedUser.id !== user.id) {
          users.push(parsedUser);
        }
      });
      if (users.length > 0) {
        res.status(200).json(users);
        return;
      }
    }

    // return users.filter(u => u.id !== currentUserId);

    const usersList = await User.findAll({
      attributes: ['id', 'name', 'avatar'],
      include: [
        {
          model: Discussion,
          attributes: [],
          where: { mock_test_id: +mock_test_id },
        },
      ],
      group: ['User.id'],
      order: [
        [sequelize.fn('MAX', sequelize.col('Discussions.created_at')), 'DESC'],
      ],
    });

    if (usersList.length > 0) {
      const hashData: Record<string, string> = {};
      usersList.forEach(u => {
        hashData[u.id.toString()] = JSON.stringify(u);
      });

      await redisClient.hSet(redisKey, hashData);
      await redisClient.expire(redisKey, 3600); // 1 hour TTL
    }

    res.status(200).json(usersList);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};
export const getHistoryDiscussions = async (req: Request, res: Response) => {
  try {
    const { mock_test_id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const page_size = parseInt(req.query.page_size as string) || 20;
    if (page === 1) {
      const cachedMessages = await redisClient.lRange(
        `room:${mock_test_id}:messages`,
        0,
        page_size - 1,
      );

      if (cachedMessages.length > 0) {
        const messages = cachedMessages.map(msg => JSON.parse(msg));

        // Return cached messages directly (you may want to enhance to include total count or next_page)
        res.status(200).json({
          results: messages,
          page: 1,
          total: messages.length, // Note: total count might be approximate
          next_page: messages.length === page_size ? 2 : null,
        });
        return;
      }
    }
    const discussions = await paginate<Discussion>(
      Discussion,
      {
        where: { mock_test_id: +mock_test_id },
        attributes: ['message', 'created_at', 'id', 'user_id'],
        order: [['created_at', 'DESC']],
      },
      {
        page,
        page_size,
      },
    );
    if (page === 1) {
      const messagesToCache = discussions.results.map(msg =>
        JSON.stringify(msg),
      );
      if (messagesToCache.length > 0) {
        await redisClient.rPush(
          `room:${mock_test_id}:messages`,
          messagesToCache,
        );
      }
    }
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};
