// Libs
import { Model } from "sequelize";
import winston from "winston";

import DatabaseModel from "./databaseModel";
import ipsSchema from "./schemas/ipsSchema";

// Classes
/**
 * A class to represent the ip table.
 */
class IpsModel {
  private static IpsModel = DatabaseModel.seq.define(
    "ips",
    ipsSchema
  );

  /**
   * A method to get the all IPs.
   */
  public static async get(logger: winston.Logger): Promise<Model<any, any>[]> {
    logger.info("Getting all IPs...");
    const ipResult = await this.IpsModel.findAll();

    return ipResult;
  }

  public static async add(logger: winston.Logger, entries: string[]): Promise<void> {
    // Add the ip to the database.
    logger.info("Inserting IPs to the database.");
    entries.forEach( async (ip) => {
      try {
        await this.IpsModel.findOrCreate({
          where: {
            ip: ip
          },
          defaults: {
            ip: ip
          }
        })
      } catch (err) {
          logger.error(`Couldn't insert the ip #${ip} in the database.`);  
      }
    });
  }

  /**
   * A method to sync the table.
   */
  public static async sync(): Promise<void> {
    // Sync the table.
    await this.IpsModel.sync();
  }
}

// Code
export default IpsModel;
