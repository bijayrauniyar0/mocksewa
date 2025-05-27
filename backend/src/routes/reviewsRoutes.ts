import express from 'express';
// import multer from 'multer';
import {
  createReview,
  getReviews,
  getReviewsByMockTestId,
} from '../controllers/reviewsController';

const reviewRouter = express.Router();

// Set up multer to handle file uploads (store in memory for now)
// const upload = multer({
//   dest: '/',
//   limits: { fileSize: 1024 * 1024 },
// });

// POST /review — with image upload field named "profile-photo"
// reviewRouter.post('/', upload.single('profile_photo'), createReview);
reviewRouter.post('/', createReview);
reviewRouter.get('/', getReviews);
reviewRouter.get('/:mock_test_id', getReviewsByMockTestId);

export default reviewRouter;
