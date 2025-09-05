import { Request, Response } from 'express';
import Bookmark from '../models/bookmarksModel';
import MockTest from '../models/mockTestModel';
import Stream from '../models/streamModels';
import { Sequelize } from 'sequelize';
import { Op } from '@sequelize/core';

export const getAllBookmarks = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;
    const { search } = req.query;
    const bookmarks = await Bookmark.findAll({
      attributes: [
        'id',
        'mock_test_id',
        [Sequelize.col('MockTest.title'), 'title'],
        [Sequelize.col('MockTest.time_limit'), 'time_limit'],
        [Sequelize.col('MockTest->Stream.name'), 'stream_name'],
        [Sequelize.col('MockTest.stream_id'), 'stream_id'],
        [Sequelize.col('MockTest.question_count'), 'question_count'],
      ],
      include: [
        {
          model: MockTest,
          attributes: [],
          include: [
            {
              model: Stream,
              attributes: [],
            },
          ],
        },
      ],
      where: {
        user_id,
        ...(search
          ? {
              [Op.or]: [
                { '$MockTest.title$': { [Op.iLike]: `%${search}%` } },
                {
                  '$MockTest->Stream.name$': {
                    [Op.iLike]: `%${search}%`,
                  },
                },
              ],
            }
          : {}),
      },
      raw: true,
      nest: false,
    });

    if (!bookmarks) {
      res.status(404).json({ message: 'No bookmarks found' });
      return;
    }

    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { mock_test_id } = req.params;
    if (!mock_test_id) {
      res.status(400).json({ message: 'Mock test ID is required' });
    }
    const existingBookmark = await Bookmark.findOne({
      where: { user_id: userId, mock_test_id },
    });
    if (existingBookmark) {
      await existingBookmark.destroy();
      res.status(200).json({ message: 'Bookmark removed' });
      return;
    }

    const newBookmark = await Bookmark.create({
      user_id: userId,
      mock_test_id,
    });
    if (!newBookmark) {
      res.status(500).json({ message: 'Failed to add bookmark' });
      return;
    }
    res.status(201).json({ message: 'Bookmark added' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getBookmarkByMockTestId = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { mock_test_id } = req.params;
    if (!mock_test_id) {
      res.status(400).json({ message: 'Bookmark ID is required' });
      return;
    }
    const bookmark = await Bookmark.findOne({
      where: {
        mock_test_id,
        user_id: userId,
      },
    });
    res.status(200).json({ is_bookmarked: !!bookmark });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
