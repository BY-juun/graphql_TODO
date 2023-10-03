import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

interface DBConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    dialect: Dialect | undefined;
    host: string;
  };
}

const dbConfig: DBConfig = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD as string,
    database: "SimpleBoard_DEV",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD as string,
    database: "SimpleBoard_TEST",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD as string,
    database: "SimpleBoard_PRODUCTION",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default dbConfig;
