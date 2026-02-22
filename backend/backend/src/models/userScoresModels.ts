import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Test from './mockTestModel';
import MockTest from './mockTestModel';

class UserScores extends Model {
  public id!: number;
  public User!: User;
  public user_id!: number;
  public score!: number;
  public mock_test_id!: string;
  public question_count!: number;
  public time_limit!: number;
  public full_marks!: number;
  public section_scores!: JSON;
  public MockTest!: MockTest;
  public elapsed_time!: number;
  public mode!: 'practice' | 'ranked' | 'challenge';
  public readonly created_at!: Date;
  public unanswered_questions!: number;
}

UserScores.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mock_test_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null for daily challenges if they don't belong to a specific mock test
    },
    mode: {
      type: DataTypes.ENUM('practice', 'ranked'),
      allowNull: false,
      defaultValue: 'practice',
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    full_marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    time_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    section_scores: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    unanswered_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    elapsed_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'user_scores',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

UserScores.belongsTo(Test, {
  foreignKey: 'mock_test_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Test.hasMany(UserScores, {
  foreignKey: 'mock_test_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(UserScores, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserScores.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default UserScores;
