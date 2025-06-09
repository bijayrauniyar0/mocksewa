/* eslint-disable no-console */
// src/index.ts
import http from 'http';
import app from './server';
import { PORT } from './constants';
import sequelize from './config/database';
import { connectRedis } from './config/redis';
import SocketService from './services/socket';

async function init() {
  const httpServer = http.createServer(app);
  const socketService = new SocketService();
  socketService.io.attach(httpServer);

  sequelize
    .authenticate()
    .then(() => {
      return sequelize.sync({ force: false });
    })
    .then(async () => {
      try {
        await connectRedis();
      } catch (err) {
        console.error('Socket error:', err);
      }
      httpServer.listen(Number(PORT) || 9000, '0.0.0.0', () => {});
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  socketService.initListeners();
}

init();
