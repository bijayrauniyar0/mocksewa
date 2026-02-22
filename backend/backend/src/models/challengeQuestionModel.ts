import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Challenge from './challengeModel';
import MCQ from './mcqModels';

class ChallengeQuestion extends Model {
  public challenge_id!: number;
  public question_id!: number;
}

ChallengeQuestion.init(
  {
    challenge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Challenge,
        key: 'id',
      },
    },
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: MCQ,
        key: 'id',
      },
    },
  },
  {
    tableName: 'challenge_questions',
    sequelize,
    timestamps: false,
  },
);

Challenge.belongsToMany(MCQ, {
  through: ChallengeQuestion,
  foreignKey: 'challenge_id',
  otherKey: 'question_id',
});

MCQ.belongsToMany(Challenge, {
  through: ChallengeQuestion,
  foreignKey: 'question_id',
  otherKey: 'challenge_id',
});

export default ChallengeQuestion;
