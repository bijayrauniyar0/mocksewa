import { Request, Response } from 'express';
import Review from '../models/reviewsModel';
import User from '../models/userModels';
import MockTest from '../models/mockTestModel';
import { paginate } from '../utils/paginate';

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.user;
    const { review, mock_test_id, rating } = req.body;

    const reviewResponse = await Review.create({
      user_id: id,
      rating,
      mock_test_id,
      review,
    });
    if (!reviewResponse) {
      res.status(500).json({ message: 'Failed to create review' });
    }
    res.status(201).json({
      message: 'Review created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
    return;
  }
};

export const getReviews = async (
  req: Request<unknown, unknown, unknown, { limit?: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { limit } = req.query;
    const reviews = await Review.findAll({
      attributes: ['id', 'rating', 'review', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar'],
        },
        {
          model: MockTest,
          attributes: ['id', 'title'],
        },
      ],
      limit: Number(limit) || 10,
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getReviewsByMockTestId = async (
  req: Request<{ mock_test_id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { mock_test_id } = req.params;
    const { page = 1, page_size = 15 } = req.query;
    const reviews = await paginate(
      Review,
      {
        where: { mock_test_id },
        attributes: ['id', 'rating', 'review', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar'],
          },
        ],
        order: [['created_at', 'DESC']],
      },
      {
        page: +page,
        page_size: +page_size,
      },
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
