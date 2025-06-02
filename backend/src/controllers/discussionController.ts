// src/controllers/chatController.ts
import { Socket } from 'socket.io';
import Discussion from '../models/discussionModel';
import User from '../models/userModels';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { paginate } from '../utils/paginate';
import redisClient from '../config/redis';

export class ChatController {
  static async handleJoinRoom(socket: Socket, mock_test_id: string) {
    try {
      socket.join(mock_test_id);
    } catch {
      // Handle error
    }
  }
  static async handleSendMessage(
    socket: Socket,
    mock_test_id: string,
    message: string,
    messageId: string,
  ) {
    try {
      const user = socket.data.user;
      const userData = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'name', 'avatar'],
        raw: true,
      });

      const messagePayload = {
        mock_test_id: +mock_test_id,
        message,
        user_id: +user.id,
        messageId,
        created_at: new Date().toISOString(),
        User: userData,
      };
      await redisClient.rPush(
        `room:${mock_test_id}:pendingMessages`,
        JSON.stringify(messagePayload),
      );
      await redisClient.sAdd('roomsWithPendingMessages', `${mock_test_id}`);
      await redisClient.lPush(
        `room:${mock_test_id}:messages`,
        JSON.stringify(messagePayload),
      );
      await redisClient.lTrim(`room:${mock_test_id}:messages`, 0, 19);

      socket.to(mock_test_id).emit('receiveMessage', messagePayload);
      socket.emit('messageDelivered', messageId);
    } catch {
      socket.emit('messageError', messageId);
    }
  }
  static handleDisconnect(socket: Socket) {
    // eslint-disable-next-line no-console
    console.log(`User disconnected: ${socket.id}`, socket.data.user.id);
  }
  static handleError(socket: Socket, error: any) {
    // eslint-disable-next-line no-console
    console.error(`Socket error: ${error}`);
    socket.emit('error', 'An error occurred');
  }
}

export const getAllUsersInChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mock_test_id } = req.params;
    const users = await User.findAll({
      attributes: ['id', 'name', 'avatar'],
      include: [
        {
          model: Discussion,
          where: { mock_test_id: +mock_test_id },
          attributes: [],
        },
      ],
      where: {
        id: {
          [Op.ne]: userId, // Exclude current user
        },
      },
      group: ['User.id'],
    });
    res.status(200).json(users);
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
          results: messages.map(msg => JSON.parse(msg)),
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
        attributes: ['message', 'created_at', 'id'],
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar'],
          },
        ],
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

export async function batchInsertMessages() {
  try {
    // Get all rooms with pending messages
    const rooms = await redisClient.sMembers('roomsWithPendingMessages');

    for (const mock_test_id of rooms) {
      const pendingKey = `room:${mock_test_id}:pendingMessages`;

      // Fetch all pending messages for this room
      const pendingMessages = await redisClient.lRange(pendingKey, 0, -1);
      if (pendingMessages.length === 0) {
        // If no pending messages, remove room from set
        await redisClient.sRem('roomsWithPendingMessages', mock_test_id);
        continue;
      }

      // Parse messages
      const messagesToInsert = pendingMessages.map(msg => JSON.parse(msg));

      // Bulk insert into DB
      await Discussion.bulkCreate(
        messagesToInsert.map(msg => ({
          mock_test_id: msg.mock_test_id,
          message: msg.message,
          user_id: msg.user_id,
          created_at: msg.created_at,
        })),
      );

      // Delete all processed messages from Redis queue
      await redisClient.del(pendingKey);

      // Remove room from active rooms set (processed)
      await redisClient.sRem('roomsWithPendingMessages', mock_test_id);
    }
  } catch {
    // console.error('Batch insert error:', error);
  }
}

// Run batch every 3 seconds

export default ChatController;
