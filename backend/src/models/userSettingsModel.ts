// src/models/userSettingsModel.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';

// Define the UserSettings model
class UserSettings extends Model {
  public id!: number;
  public user_id!: number;
  public settings!: JSON;
  public created_at!: Date;
  public updated_at!: Date;
}

UserSettings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: 'user_settings',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
);
User.hasMany(UserSettings, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserSettings.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default UserSettings;
