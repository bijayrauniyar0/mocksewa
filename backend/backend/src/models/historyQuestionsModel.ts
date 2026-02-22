import { Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import MCQ from './mcqModels';

class HistoryQuestions extends Model {
  public id!: number;
  public user_id!: number;
  public question_id!: number;
  public test_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

HistoryQuestions.init(
  {
    id: {
      type: 'INTEGER',
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: 'INTEGER',
      allowNull: false,
    },
    question_id: {
      type: 'INTEGER',
      allowNull: false,
    },
    test_id: {
      type: 'INTEGER',
      allowNull: false,
    },
  },
  {
    tableName: 'history_questions',
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
User.hasMany(HistoryQuestions, { foreignKey: 'user_id' });
HistoryQuestions.belongsTo(User, { foreignKey: 'user_id' });
MCQ.hasMany(HistoryQuestions, { foreignKey: 'question_id' });
HistoryQuestions.belongsTo(MCQ, { foreignKey: 'question_id' });

export default HistoryQuestions;
