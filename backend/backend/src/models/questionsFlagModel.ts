import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import MCQ from './mcqModels';
class QuestionFlag extends Model {
  public id!: number;
  public question_id!: number;
  public user_id!: number;
  public reason!: string;
}
QuestionFlag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'question_flags',
    sequelize,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

User.hasMany(QuestionFlag, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
QuestionFlag.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

MCQ.hasMany(QuestionFlag, {
  foreignKey: 'question_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

QuestionFlag.belongsTo(MCQ, {
  foreignKey: 'question_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default QuestionFlag;
