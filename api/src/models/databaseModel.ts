// Libs
import { Sequelize } from "sequelize";

// Classes
/**
 * A class to represent the database.
 */
class DatabaseModel {
  public static seq = new Sequelize({
    dialect: "postgres",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,

    host: "restapi-torips-db",
    port: 5432,
    logging: false,
  });
}

// Code
export default DatabaseModel;
