require('dotenv').config();
import { Sequelize } from 'sequelize';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export const sequelize = new Sequelize(process.env.DATABASE_URL as string || 'postgresql://neondb_owner:PURX7B9Guckw@ep-divine-fire-a1mgbbfq.ap-southeast-1.aws.neon.tech/neondb', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    },
  },
});

export default sequelize;
