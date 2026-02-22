import express from 'express';
// import multer from 'multer';
import {
  createReview,
  getReviews,
  getReviewsByMockTestId,
} from '../controllers/reviewsController';

const reviewRouter = express.Router();

reviewRouter.post('/', createReview);
reviewRouter.get('/', getReviews);
reviewRouter.get('/:mock_test_id', getReviewsByMockTestId);

export default reviewRouter;
