// Libs
import { Request, Response } from "express";

import DanmeModel from "@models/danmeModel";
import OnionooModel from "@models/onionooModel";

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

    // Concat the results and return to the client.
    req.logger.info("Returning results to the client...");
    res.status(200).json({
      status: "success",
      data: danmeResults.concat(onionooResults ? onionooResults : []),
    });
  }

  /**
   * DELETE /ip/:ip
   */
  public static async del(req: Request, res: Response): Promise<void> {}
}

// Code
export default IpController;
