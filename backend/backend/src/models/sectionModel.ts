import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Section extends Model {
  public id!: number;
  public name!: number;
  public question_weight!: number;
  public marks_per_question!: number;
  public negative_marking!: number;
}

Section.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    marks_per_question: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    negative_marking: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: 'sections',
    sequelize,
    timestamps: false,
  },
);

export default Section;
