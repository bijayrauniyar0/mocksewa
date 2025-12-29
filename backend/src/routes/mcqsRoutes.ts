import {
  createUserScore,
  getMCQs,
  getMCQsAnswers,
} from '../controllers/mcqsController';
import express from 'express';
import { authenticate } from '../middlewares/authenticate';

const mcqRouter = express.Router();

mcqRouter.get('/questions/:test_id/', authenticate, getMCQs);
mcqRouter.get('/answers/', authenticate, getMCQsAnswers);
mcqRouter.post('/submit/', authenticate, createUserScore);

export default mcqRouter;
