import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Contact phone or details'
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'URL friendly identifier for the company'
  },
  logo: {
    type: DataTypes.STRING,
    comment: 'URL to company logo'
  },
  primaryColor: {
    type: DataTypes.STRING,
    defaultValue: '#2563eb' // Default blue
  },
  secondaryColor: {
    type: DataTypes.STRING,
    defaultValue: '#1e40af'
  },
  isPro: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  subscriptionStatus: {
    type: DataTypes.ENUM('active', 'inactive', 'trial'),
    defaultValue: 'trial'
  }
}, {
  timestamps: true
});

export { Company };
