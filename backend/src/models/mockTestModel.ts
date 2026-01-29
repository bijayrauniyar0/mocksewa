import { BelongsToManyGetAssociationsMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Section from './sectionModel';

class MockTest extends Model {
  public id!: number;
  public title!: string;
  public time_limit!: number;
  public question_count!: number;
  public Sections!: Section[];
  public getSections!: BelongsToManyGetAssociationsMixin<Section>;
}

MockTest.init(
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
    question_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'mock_tests',
    sequelize,
    timestamps: false,
  },
);

export default MockTest;
