import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL;
const sslRequired = (process.env.DB_SSL === 'true') || /sslmode=require/i.test(url || '') || process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(url, {
  dialect: 'postgres',
  logging: false, 
  dialectOptions: {
    ssl: sslRequired ? { require: true, rejectUnauthorized: false } : false
  }
});

export default sequelize;
