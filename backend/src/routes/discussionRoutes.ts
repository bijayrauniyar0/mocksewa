import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { getUsersInChat, getHistoryDiscussions } from '../controllers/discussionController';

const discussionRouter = express.Router();

discussionRouter.get('/:mock_test_id', authenticate, getUsersInChat);
discussionRouter.get('/history/:mock_test_id', authenticate, getHistoryDiscussions);

export default discussionRouter;