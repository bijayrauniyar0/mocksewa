// src/server.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import mcqRouter from './routes/mcqsRoutes';
import userScoresRouter from './routes/leaderboardRoutes';
import streamRouter from './routes/streamRoutes';
import notificationRouter from './routes/notificationRoutes';
import analyticsRouter from './routes/analyticsRoutes';
import './models/testSectionLinkModel';
import './models/userSettingsModel';
import './models/questionsFlagModel';
import './models/historyQuestionsModel';
import './models/userAttemptDetailModel';
import authRouter from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import reviewRouter from './routes/reviewsRoutes';
import bookmarkRouter from './routes/bookmarkRoutes';
import discussionRouter from './routes/discussionRoutes';
import { CORS_ORIGIN } from './constants/index';
import questionFlagRouter from './routes/questionFlagRouter';
import { getCorsOptions } from './utils/createCorsMiddleware';

const app = express();

app.set('view engine', 'ejs');
app.use(cors(getCorsOptions(CORS_ORIGIN)));
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON requests

app.use('/api/user', userRoutes);
app.use('/api/mcq', mcqRouter);
app.use('/api/streams', streamRouter);
app.use('/api/leaderboard', userScoresRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/review', reviewRouter);
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/discussions', discussionRouter);
app.use('/api/questions-flag', questionFlagRouter);
app.use('/api/health-check/', (request, res) => {
  res.status(200).send('Server is healthy');
});

export default app;
