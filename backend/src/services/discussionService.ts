import { Socket } from 'socket.io';
import redisClient from '../config/redis';
import Discussion from '../models/discussionModel';
import MockTest from '../models/mockTestModel';
import Notification from '../models/notificationModel';
import User from '../models/userModels';

interface IMention {
  user_id: number;
  label: string;
  offset: number;
  length: number;
}
interface IMessage {
  text: string;
  mentions: IMention[];
}
export class DiscussionService {
  private static batchInsertTimeout: NodeJS.Timeout | null = null;

  static async handleJoinRoom(socket: Socket, room: string) {
    try {
      socket.join(room);
    } catch {
      // Handle error
    }
  }
  static async handleSendMessage(
    socket: Socket,
    mock_test_id: string,
    message: string,
    messageId: string,
    room_id: string,
  ) {
    try {
      const user = socket.data.user;
      const messagePayload = {
        mock_test_id: +mock_test_id,
        message,
        user_id: +user.id,
        messageId,
        created_at: new Date().toISOString(),
      };
      const userRecordCount = await Discussion.count({
        where: {
          mock_test_id: +mock_test_id,
          user_id: +user.id,
        },
      });
      const isUserHasRecord = userRecordCount > 0;

      if (!isUserHasRecord) {
        const key = `mocktest:${mock_test_id}:users`;
        await redisClient.hset(key, user.id.toString(), JSON.stringify(user));
        await redisClient.expire(key, 3600); // 1 hour TTL
      }
      await redisClient.rPush(
        `discussion:${mock_test_id}:pendingMessages`,
        JSON.stringify(messagePayload),
      );

      await redisClient.lPush(
        `discussion:${mock_test_id}:messages`,
        JSON.stringify(messagePayload),
      );

      // <-- Add the room to the set tracking rooms with pending messages
      await redisClient.sAdd('roomsWithPendingMessages', mock_test_id);

      socket.to(room_id.toString()).emit('receiveMessage', messagePayload);
      socket.emit('messageDelivered', messageId);
      if (this.batchInsertTimeout) {
        clearTimeout(this.batchInsertTimeout);
      }
      this.batchInsertTimeout = setTimeout(() => {
        this.batchInsertMessages();
        this.batchInsertTimeout = null;
      }, 2000);
    } catch {
      socket.emit('messageError', messageId);
    }
  }
  static async batchInsertMessages() {
    try {
      // Get all rooms with pending messages
      const rooms = await redisClient.sMembers('roomsWithPendingMessages');

      for (const mock_test_id of rooms) {
        const pendingKey = `discussion:${mock_test_id}:pendingMessages`;

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
        await redisClient.expire(`room:${mock_test_id}:messages`, 0);
        try {
          await Promise.all(
            messagesToInsert.map(
              async msg =>
                await DiscussionService.notifyMentions(
                  msg.mock_test_id.toString(),
                  msg.user_id,
                  msg.message,
                ),
            ),
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error notifying mentions:', error);
        }
        // Delete all processed messages from Redis queue
        await redisClient.del(pendingKey);

        // Remove room from active rooms set (processed)
        await redisClient.sRem('roomsWithPendingMessages', mock_test_id);
      }
    } catch {
      // console.error('Batch insert error:', error);
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

  static async notifyMentions(
    mock_test_id: string,
    actor_id: number,
    message: IMessage,
  ) {
    const mockTest = await MockTest.findOne({
      where: { id: +mock_test_id },
      attributes: ['title', 'stream_id'],
    });
    if (!mockTest) {
      return;
    }
    const actorName = await User.findOne({
      where: { id: actor_id },
      attributes: ['name'],
    });
    if (!actorName) {
      return;
    }

    const uniqueUserIds = Array.from(
      new Set(message.mentions.map(m => m.user_id)),
    );

    const notifications = uniqueUserIds.map(userId => ({
      user_id: userId,
      actor_id,
      message: `You were mentioned by ${actorName?.name} in the discussion of "${mockTest?.title}"`,
      type: 'discussion',
      meta: {
        mock_test_id: +mock_test_id,
        stream_id: mockTest?.stream_id || null,
      },
    }));
    Notification.bulkCreate(notifications, {
      ignoreDuplicates: true,
    });
  }
}
