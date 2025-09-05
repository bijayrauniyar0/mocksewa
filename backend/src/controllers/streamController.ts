import Stream from '../models/streamModels';
import Test from '../models/mockTestModel';
import { Request, Response } from 'express';
import UserScores from '../models/userScoresModels';
import MockTest from '../models/mockTestModel';
import Bookmark from '../models/bookmarksModel';
import Section from '../models/sectionModel';
import { Sequelize } from 'sequelize';

export class StreamsService {
  async getStreams() {
    try {
      const streams = await Stream.findAll({});
      const updatedStreams = await Promise.all(
        streams.map(async stream => {
          const testsCount = await Test.count({
            where: { stream_id: stream.id },
          });
          const numberOfStudents = await UserScores.count({
            distinct: true,
            col: 'user_id',
            include: [
              {
                model: Test,
                where: { stream_id: stream.id },
                attributes: [],
              },
            ],
          });

          return {
            ...stream.toJSON(),
            tests_count: testsCount,
            students_count: numberOfStudents,
          };
        }),
      );
      return updatedStreams;
    } catch {
      throw new Error('Internal server error');
    }
  }
  async getTestsList(stream_id?: number, attributes?: string[]) {
    try {
      const whereClause: Record<string, any> = {};
      if (stream_id) {
        whereClause.stream_id = stream_id;
      }
      const tests = await Test.findAll({
        ...(whereClause && { where: whereClause }),
        ...(attributes && { attributes }),
        include: [
          {
            model: Stream,
            attributes: ['name'],
          },
        ],
      });
      return tests.map(test => {
        const { Stream, ...restData } = test.toJSON();
        return { ...restData, stream_name: Stream?.name };
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getTestsMetaDataAccordingToSection(
    test_id: number | string,
  ): Promise<{ sections: Section[] } & Record<string, any>> {
    try {
      const tests = await Test.findByPk(test_id);
      if (!tests) {
        throw new Error('Test not found');
      }
      const sections = await tests.getSections({
        joinTableAttributes: [],
        raw: true,
      });
      return { ...tests.toJSON(), sections };
    } catch {
      throw new Error('Internal server error');
    }
  }
}
export const getStreams = async (req: Request, res: Response) => {
  try {
    const streamsService = new StreamsService();
    const streams = await streamsService.getStreams();
    res.status(200).json(streams);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMockTestsListByStream = async (req: Request, res: Response) => {
  const { stream_id } = req.params;
  try {
    const tests = await Test.findAll({
      attributes: [
        'id',
        'stream_id',
        'title',
        'question_count',
        'time_limit',
        [Sequelize.col('Stream.name'), 'stream_name'], // alias it
        [
          Sequelize.fn('COUNT', Sequelize.col('UserScores.user_id')),
          'students_count',
        ],
        [
          Sequelize.literal(
            `CASE WHEN "Bookmarks"."id" IS NOT NULL THEN true ELSE false END`,
          ),
          'bookmark',
        ],
        [
          Sequelize.fn('MAX', Sequelize.col('UserScores.created_at')),
          'last_accessed',
        ],
      ],
      include: [
        { model: Stream, attributes: [] },
        { model: UserScores, attributes: [] },
        {
          model: Bookmark,
          attributes: [],
          where: { user_id: req.user?.id || null },
          required: false,
        },
        {
          model: UserScores,
          attributes: [],
          where: { user_id: req.user?.id || null },
          required: false,
        }
      ],
      where: { stream_id },
      group: ['MockTest.id', 'Stream.id', 'Bookmarks.id'],
      raw: true,
      nest: false,
    });

    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getAllMockTests = async (req: Request, res: Response) => {
  try {
    const mockTests = await MockTest.findAll({
      attributes: ['id', 'title'],
    });
    res.status(200).json(mockTests);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

export const getMockTestDetails = async (req: Request, res: Response) => {
  const { mock_test_id } = req.params;
  const { question_count } = req.query;
  try {
    if (!mock_test_id) {
      res.status(400).json({ message: 'test_id is required' });
      return;
    }
    const streamsService = new StreamsService();
    const sections = await streamsService.getTestsMetaDataAccordingToSection(
      mock_test_id,
    );
    const streams = await Stream.findOne({
      where: { id: sections.stream_id },
      attributes: ['name'],
    });
    let bookmark = false;
    if (req.user) {
      const bookmarks = await Bookmark.findOne({
        where: {
          user_id: req.user.id,
          mock_test_id: +mock_test_id,
        },
      });
      bookmark = !!bookmarks;
    }
    let { time_limit } = sections;
    if (question_count && question_count !== sections.question_count) {
      const timeLimitPerQuestion = time_limit / sections.question_count;
      time_limit = Math.floor(timeLimitPerQuestion * Number(question_count));
    }
    res
      .status(200)
      .json({ bookmark, ...sections, time_limit, stream_name: streams?.name });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
