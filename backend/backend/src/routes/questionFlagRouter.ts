import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { flagQuestion } from '../controllers/questionFlagController';

const questionFlagRouter = express.Router();

questionFlagRouter.post('/flag', authenticate, flagQuestion);

export default questionFlagRouter;
