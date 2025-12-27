import { Request, Response } from 'express';
import QuestionFlag from '../models/questionsFlagModel';

export const flagQuestion = async (req: Request, res: Response) => {
  try {
    const { question_id, reason } = req.body;
    const user_id = req.user.id;
    if (!question_id || !reason) {
      res.status(400).json({ message: 'question_id and reason are required.' });
      return;
    }
    const isAlreadyFlagged = await QuestionFlag.findOne({
      where: { question_id, user_id },
    });
    if (isAlreadyFlagged) {
      res
        .status(409)
        .json({ message: 'You have already flagged this question.' });
      return;
    }
    await QuestionFlag.create({
      question_id,
      user_id,
      reason,
    });

    res.status(201).json({ message: 'Question flagged successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};
