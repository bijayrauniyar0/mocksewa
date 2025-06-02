import { Server } from 'socket.io';
import { socketAuthMiddleware } from '../middlewares/authenticate';
import ChatController, {
  batchInsertMessages,
} from '../controllers/discussionController';

export type SocketSendMessageType = {
  mock_test_id: string;
  message: string;
  messageId: string;
};
const connectedUsers = new Map<string, any>();
export const initializeSocket = (io: Server) => {
  io.use(socketAuthMiddleware);
  setInterval(batchInsertMessages, 10000);

  try {
    io.on('connection', socket => {
      connectedUsers.set(socket.id, socket.data.user);
      socket.on('joinRoom', (mock_test_id: string) => {
        ChatController.handleJoinRoom(socket, mock_test_id);
      });

      socket.on(
        'sendMessage',
        ({ mock_test_id, message, messageId }: SocketSendMessageType) => {
          ChatController.handleSendMessage(
            socket,
            mock_test_id,
            message,
            messageId,
          );
        },
      );

      socket.on('disconnect', () => {
        connectedUsers.delete(socket.id);
        socket.emit('disconnected', socket.id);
      });
      socket.on('connection_error', err =>
        ChatController.handleError(socket, err),
      );
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Socket error:', err);
  }
};
