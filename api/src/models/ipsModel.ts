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
  public static ipsModel = DatabaseModel.seq.define("ips", ipsSchema);

  /**
   * A method to get some IPs.
   */
  public static async get(
    logger: winston.Logger,
    where = {}
  ): Promise<Model<any, any>[]> {
    logger.info("Getting some IPs...");
    const ipResult = await this.ipsModel.findAll({
      where: where,
    });

    return ipResult;
  }

  /**
   * A method to add an ip to the ips table.
   */
  public static async add(
    logger: winston.Logger,
    entries: string[]
  ): Promise<void> {
    // Add the ip to the database.
    logger.info("Inserting IPs to the database.");
    entries.forEach(async (ip) => {
      try {
        await this.ipsModel.findOrCreate({
          where: {
            ip: ip,
          },
          defaults: {
            ip: ip,
            visible: true,
          },
        });
      } catch (err) {
        logger.error(`Couldn't insert the ip #${ip} in the database.`);
      }
    });
  }

  /**
   * A method to ban some ip from the database.
   */
  public static async ban(logger: winston.Logger, id: string): Promise<void> {
    // Change the visibility from some ip.
    logger.info("Changing the visibility from an ip...");
    const ipResult = await this.get(logger, { id: id });
    if (!ipResult.length) return;

    await ipResult[0].update({
      visible: false,
    });
  }

  /**
   * A method to sync the table.
   */
  public static async sync(): Promise<void> {
    // Sync the table.
    await this.ipsModel.sync();
  }
}

// Code
export default IpsModel;
