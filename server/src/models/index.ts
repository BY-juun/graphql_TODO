import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

export const sequelizeInstance = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

export { default as createTables } from "./createTables";
