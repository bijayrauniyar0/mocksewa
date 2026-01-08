import {
  createUserScore,
  getMCQs,
  getMCQsAnswers,
  getAllMockTests,
  getMockTestDetails,
} from '../controllers/mcqsController';
import express from 'express';
import { authenticate, maybeAuthenticate } from '../middlewares/authenticate';

const mcqRouter = express.Router();

mcqRouter.get('/questions/:test_id/', authenticate, getMCQs);
mcqRouter.get('/answers/', authenticate, getMCQsAnswers);
mcqRouter.post('/submit/', authenticate, createUserScore);

// New routes to replace stream functionality
mcqRouter.get('/mock-tests/', getAllMockTests);
mcqRouter.get(
  '/mock-tests/meta-data/:mock_test_id/',
  maybeAuthenticate,
  getMockTestDetails,
);

export default mcqRouter;
