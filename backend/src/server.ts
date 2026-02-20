// src/server.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import mcqRouter from './routes/mcqsRoutes';
import userScoresRouter from './routes/leaderboardRoutes';
import notificationRouter from './routes/notificationRoutes';
import analyticsRouter from './routes/analyticsRoutes';
import './models/testSectionLinkModel';
import './models/userSettingsModel';
import './models/questionsFlagModel';
import './models/historyQuestionsModel';
import './models/userAttemptDetailModel';
import './models/challengeModel';
import './models/challengeQuestionModel';
import './models/challengeParticipantModel';
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

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/mcq', mcqRouter);
app.use('/api/v1/leaderboard', userScoresRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/discussions', discussionRouter);
app.use('/api/v1/questions-flag', questionFlagRouter);
app.use('/api/v1/health-check/', (request, res) => {
  res.status(200).send('Server is healthy');
});

export default app;
