import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Challenge extends Model {
  public id!: number;
  public title!: string;
  public date!: string; // YYYY-MM-DD
  public total_questions!: number;
  public time_limit!: number;
  public subject_id!: number; // We'll link to a section as "subject"
}

Challenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    time_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 600, // 10 minutes default
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'challenges',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Challenge;
