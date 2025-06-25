// src/controllers/chatController.ts
import Discussion from '../models/discussionModel';
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { paginate } from '../utils/paginate';
import redisClient from '../config/redis';
import sequelize from '../config/database';
import User from '../models/userModels';

// export const getUsersInChat = async (req: Request, res: Response) => {
//   try {
//     const { mock_test_id } = req.params;
//     const page = parseInt((req.query.page as string) || '1');
//     const pageSize = parseInt((req.query.page_size as string) || '10');
//     const offset = (page - 1) * pageSize;

//     const results = await sequelize.query(
//       `
//       SELECT u.id, u.name, u.avatar, MAX(d."created_at") as last_active
//       FROM users u
//       INNER JOIN discussions d ON d.user_id = u.id
//       WHERE d.mock_test_id = :mock_test_id AND u.id != :userId
//       GROUP BY u.id
//       ORDER BY last_active DESC
//       LIMIT :limit OFFSET :offset
//       `,
//       {
//         replacements: {
//           mock_test_id: +mock_test_id,
//           userId: req.user?.id,
//           limit: pageSize,
//           offset,
//         },
//         type: QueryTypes.SELECT,
//       },
//     );

//     // Get total count
//     const totalResult = await sequelize.query(
//       `
//       SELECT COUNT(DISTINCT u.id) as count
//       FROM users u
//       INNER JOIN discussions d ON d.user_id = u.id
//       WHERE d.mock_test_id = :mock_test_id AND u.id != :userId
//       `,
//       {
//         replacements: { mock_test_id: +mock_test_id, userId: req.user?.id },
//         type: QueryTypes.SELECT,
//       },
//     );
//     const total = parseInt((totalResult[0] as { count: string }).count);
//     const nextPage = page * pageSize < total ? page + 1 : null;

//     res.status(200).json({
//       page,
//       page_size: pageSize,
//       total,
//       next_page: nextPage,
//       results,
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Internal server error', err });
//   }
// };

export const getUsersInChat = async (req: Request, res: Response) => {
  try {
    const { mock_test_id } = req.params;

    const results = await sequelize.query(
      `
      SELECT u.id, u.name, u.avatar, MAX(d."created_at") as last_active
      FROM users u
      INNER JOIN discussions d ON d.user_id = u.id
      WHERE d.mock_test_id = :mock_test_id AND u.id != :userId
      GROUP BY u.id
      ORDER BY last_active DESC
      `,
      {
        replacements: {
          mock_test_id: +mock_test_id,
          userId: req.user?.id,
        },
        type: QueryTypes.SELECT,
      },
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};
export const getHistoryDiscussions = async (req: Request, res: Response) => {
  try {
    const { mock_test_id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const page_size = parseInt(req.query.page_size as string) || 20;
    // if (page === 1) {
    //   const cachedMessages = await redisClient.lRange(
    //     `room:${mock_test_id}:messages`,
    //     0,
    //     page_size - 1,
    //   );

    //   if (cachedMessages.length > 0) {
    //     const messages = cachedMessages.map(msg => JSON.parse(msg));

    //     // Return cached messages directly (you may want to enhance to include total count or next_page)
    //     res.status(200).json({
    //       results: messages.map(msg => JSON.parse(msg)),
    //       page: 1,
    //       total: messages.length, // Note: total count might be approximate
    //       next_page: messages.length === page_size ? 2 : null,
    //     });
    //     return;
    //   }
    // }
    const discussions = await paginate<Discussion>(
      Discussion,
      {
        where: { mock_test_id: +mock_test_id },
        attributes: ['message', 'created_at', 'id', 'user_id'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['name', 'avatar'],
          },
        ],
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

