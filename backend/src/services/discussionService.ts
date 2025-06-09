import { Socket } from 'socket.io';
import redisClient from '../config/redis';
import Discussion from '../models/discussionModel';

export class DiscussionService {
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
      await Discussion.create({
        mock_test_id: +mock_test_id,
        message,
        user_id: +user.id,
        created_at: new Date(),
      });
      await redisClient.rPush(
        `discussion:${mock_test_id}:pendingMessages`,
        JSON.stringify(messagePayload),
      );
      await redisClient.lPush(
        `discussion:${mock_test_id}:messages`,
        JSON.stringify(messagePayload),
      );
      socket.to(room_id.toString()).emit('receiveMessage', messagePayload);
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
  static async batchInsertMessages() {
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
}
