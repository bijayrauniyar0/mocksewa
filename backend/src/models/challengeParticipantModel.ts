import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Challenge from './challengeModel';

class ChallengeParticipant extends Model {
  public id!: number;
  public challenge_id!: number;
  public user_id!: number;
  public score!: number;
  public elapsed_time!: number;
  public attempted_at!: Date;
}

ChallengeParticipant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Challenge,
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    elapsed_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attempted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'challenge_participants',
    sequelize,
    timestamps: false,
  },
);

Challenge.hasMany(ChallengeParticipant, { foreignKey: 'challenge_id' });
ChallengeParticipant.belongsTo(Challenge, { foreignKey: 'challenge_id' });

User.hasMany(ChallengeParticipant, { foreignKey: 'user_id' });
ChallengeParticipant.belongsTo(User, { foreignKey: 'user_id' });

export default ChallengeParticipant;
