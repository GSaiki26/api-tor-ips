// Libs
import { Request, Response } from "express";

import DanmeModel from "@models/danmeModel";
import OnionooModel from "@models/onionooModel";
import IpsModel from "@models/ipsModel";
import winston from "winston";
import { Model } from "sequelize";

// Classes
class IpController {
  /**
   * GET /ip
   */
  public static async get(req: Request, res: Response): Promise<void> {
    // Sync the new ips to the database.
    this.addIpsToTable(req.logger);

    // Get the ips and the deleted ips table.
    const ipsResult = await IpsModel.get(req.logger, {
      visible: true,
    });

    // Return the result to the client.
    req.logger.info("Returning results to the client...");
    res.status(200).json({
      status: "success",
      data: ipsResult,
    });
  }

  /**
   * GET /ip/all
   */
  public static async getAll(req: Request, res: Response): Promise<void> {
    // Sync the new ips to the database.
    this.addIpsToTable(req.logger);

    // Concat the results and return to the client.
    req.logger.info("Returning results to the client...");
    res.status(200).json({
      status: "success",
      data: await IpsModel.get(req.logger, {}),
    });
  }

  /**
   * DELETE /ip/:ip
   */
  public static async del(req: Request, res: Response): Promise<any> {
    // Check if the provided ip exists in the database.
    const ip = req.params.ip;
    const ipResult: Model<any, any>[] = await IpsModel.get(req.logger, {
      ip: ip,
    });

    if (!ipResult.length) {
      return res.status(400).json({
        status: "error",
        message: "Ip not found.",
      });
    }

    // Add the deleted ips to the deleted ip table.
    try {
      await IpsModel.ban(req.logger, ipResult[0].toJSON().id);
    } catch (err) {
      req.logger.error("The ip couldn't be deleted.");
      return res.status(500).json({
        status: "error",
        message: "Couldn't delete the entry.",
      });
    }

    // Return the result to the client.
    res.status(200).json({
      status: "success",
      message: "Entry deleted successfully.",
    });
  }

  /**
   * A method to add new ips from the Danme and Onionoo to the database.
   */
  public static async addIpsToTable(logger: winston.Logger): Promise<void> {
    // Get the results from the Danme.
    const danmeResults = await DanmeModel.getIps(logger);

    // Get the results from the onionoo.
    const onionooResults = await OnionooModel.getIps(logger);

    // Add the ips to the database.
    await IpsModel.add(logger, danmeResults.concat(onionooResults));
  }
}

// Code
export default IpController;
