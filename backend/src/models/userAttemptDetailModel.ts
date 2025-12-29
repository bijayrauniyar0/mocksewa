import { DataTypes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../config/database';
import UserScores from './userScoresModels';
import MCQ from './mcqModels';

class UserAttemptDetail extends Model {
  public id!: number;
  public user_score_id!: number;
  public question_id!: number;
  public selected_option!: number | null;
  public status!: 'correct' | 'incorrect' | 'unanswered' | 'flagged';
  public UserScore!: UserScores;
  public Question!: MCQ;
}

UserAttemptDetail.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_score_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'user_scores', key: 'id' },
    },
    question_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'mcq_questions', key: 'id' },
    },
    selected_option: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('correct', 'incorrect', 'unanswered', 'flagged'),
      allowNull: false,
    },
  },
  {
    tableName: 'user_attempt_details',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  },
);

// Associations
UserAttemptDetail.belongsTo(UserScores, {
  foreignKey: 'user_score_id',
  targetKey: 'id',
  as: 'UserScore',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserAttemptDetail.belongsTo(MCQ, {
  foreignKey: 'question_id',
  targetKey: 'id',
  as: 'Question',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserScores.hasMany(UserAttemptDetail, {
  foreignKey: 'user_score_id',
  sourceKey: 'id',
  as: 'AttemptDetails',
});

MCQ.hasMany(UserAttemptDetail, {
  foreignKey: 'question_id',
  sourceKey: 'id',
  as: 'AttemptDetails',
});

export type UserAttemptDetailType = InferCreationAttributes<UserAttemptDetail>;

export default UserAttemptDetail;
