import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Hashtag = sequelize.define('Hashtag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Company access code provided to users'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

export { Hashtag };
