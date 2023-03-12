// Libs
import { Request, Response } from "express";

import DanmeModel from "@models/danmeModel";
import OnionooModel from "@models/onionooModel";
import DeletedIpsModel from "@models/deletedIpsModel";
import IpsModel from "@models/ipsModel";

// Classes
class IpController {
  /**
   * GET /ip
   */
  public static async get(req: Request, res: Response): Promise<void> {}

  /**
   * GET /ip/all
   */
  public static async getAll(req: Request, res: Response): Promise<void> {
    // Get the results from the Danme.
    const danmeResults = await DanmeModel.getIps(req.logger);

    // Get the results from the onionoo.
    const onionooResults = await OnionooModel.getIps(req.logger);

    // Add the ips to the database.
    await IpsModel.add(req.logger, danmeResults.concat(onionooResults));

    // Concat the results and return to the client.
    req.logger.info("Returning results to the client...");
    res.status(200).json({
      status: "success",
      data: await IpsModel.get(req.logger),
    });
  }

  /**
   * DELETE /ip/:ip
   */
  public static async del(req: Request, res: Response): Promise<void> {}
}

// Code
export default IpController;
