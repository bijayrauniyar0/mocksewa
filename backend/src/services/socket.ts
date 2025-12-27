import { Server, Socket } from 'socket.io';
import { socketAuthMiddleware } from '../middlewares/authenticate';
import { CORS_ORIGIN } from '../constants';
import { DiscussionService } from './discussionService';
import redisClient from '../config/redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { getCorsOptions } from '../utils/createCorsMiddleware';

export type SocketSendMessageType = {
  mock_test_id: string;
  message: string;
  messageId: string;
  room_id: string;
};

const pubClient = redisClient.duplicate();
const subClient = redisClient.duplicate();

(async () => {
  await Promise.all([pubClient.connect(), subClient.connect()]);
})();

class SocketService {
  private _io: Server;
  private connectedUsers: Map<string, any> = new Map();
  constructor() {
    this._io = new Server({
      cors: getCorsOptions(CORS_ORIGIN),
      // ...CORS,
      adapter: createAdapter(pubClient, subClient),
    });
    this._io.use(socketAuthMiddleware);
  }

  get io() {
    return this._io;
  }
  public initListeners() {
    const io = this._io;
    io.on('connection', (socket: Socket) => {
      this.connectedUsers.set(socket.id, socket.data.user);

      socket.on('joinRoom', (room: string) => {
        DiscussionService.handleJoinRoom(socket, room);
      });
      socket.on(
        'sendMessage',
        async ({
          mock_test_id,
          room_id,
          message,
          messageId,
        }: SocketSendMessageType) => {
          DiscussionService.handleSendMessage(
            socket,
            mock_test_id,
            message,
            messageId,
            room_id,
          );
        },
      );

      socket.on('disconnect', () => {
        this.connectedUsers.delete(socket.id);
        socket.emit('disconnected', socket.id);
      });

      socket.on('connection_error', err => {
        DiscussionService.handleError(socket, err);
      });
    });
  }
}

export default SocketService;
