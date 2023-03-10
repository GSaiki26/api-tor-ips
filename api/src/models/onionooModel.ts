// Libs
import * as fs from "fs";
import axios, { AxiosResponse } from "axios";

import winston from "winston";
import { OnionooIp } from "@types";

// Classes
class OnionooModel {
  private static ONIONOO_URL = process.env.ONIONOO_URL!;

  /**
   * A method to get the results.
   */
  public static async getIps(logger: winston.Logger): Promise<string[]> {
    // Try to get the results from the website.
    try {
      logger.info("Doing request to Onionoo...");
      const req = await axios.get(OnionooModel.ONIONOO_URL);

      // Treat the ips.
      const ips: OnionooIp[] = req.data.relays;
      const results: string[] = [];

      // Add all ips to the result
      ips.forEach((ipEntry) => {
        ipEntry.a.forEach((ip) => {
          ip = ip.replace("[", "").replace("]", "");
          results.push(ip);
        });
      });

      return results;
    } catch (err) {
      logger.error("The request couldn't be completed.");
      return [];
    }
  }
}

// Code
export default OnionooModel;
