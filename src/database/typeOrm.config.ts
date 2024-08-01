import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/entities/**/*.ts'],
  subscribers: ['src/services/**/*.ts'],
};

export default new DataSource(config);