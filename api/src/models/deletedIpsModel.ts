// Libs
import { Model } from "sequelize";
import winston from "winston";

import DatabaseModel from "./databaseModel";
import deletedIpsSchema from "./schemas/deletedIpsSchema";

// Classes
/**
 * A class to represent the "deleted ip" table.
 */
class DeletedIpsModel {
  private static deletedIpsModel = DatabaseModel.seq.define(
    "deleted_ips",
    deletedIpsSchema
  );

  /**
   * A method to get the deleted IPs.
   */
  public static async get(logger: winston.Logger): Promise<Model<any, any>[]> {
    logger.info("Getting all deleted IPs...");
    const ipResult = await this.deletedIpsModel.findAll();

    return ipResult;
  }

  /**
   * A method to sync the table.
   */
  public static async sync(): Promise<void> {
    // Sync the table.
    await this.deletedIpsModel.sync();
  }
}

// Code
export default DeletedIpsModel;
