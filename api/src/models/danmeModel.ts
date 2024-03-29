// Libs
import * as fs from "fs";
import axios, { AxiosResponse } from "axios";

import winston from "winston";

// Classes
class DanmeModel {
  private static DANME_URL = process.env.DANME_URL!;
  private static DANME_FILEPATH = process.env.DANME_FILEPATH!;

  /**
   * A method to get the results.
   */
  public static async getIps(logger: winston.Logger): Promise<string[]> {
    // Try to get the results from the website.
    let req: AxiosResponse;

    try {
      logger.info("Doing request to Danme...");
      req = await axios.get(DanmeModel.DANME_URL);
    } catch (err) {
      logger.warn("The request couldn't be completed.");
      return [];
    }

    const result: string = req.data;
    return result.split("\n");
  }
}

// Code
export default DanmeModel;
