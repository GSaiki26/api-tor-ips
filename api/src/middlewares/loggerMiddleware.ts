// Libs
import winston from "winston";
import { Request, Response, NextFunction } from "express";

import Logger from "@logger";

// Types
declare global {
  namespace Express {
    export interface Request {
      logger: winston.Logger;
    }
  }
}

// Classes
class LoggerMiddleware {
  /**
   * A middleware to define the logger object in the request.
   */
  public static setLogger(req: Request, res: Response, next: NextFunction) {
    req.logger = Logger.getLogger(req.ip);
    req.logger.info(`Request from: ${req.ip}`);
    next();
  }
}

// Code
export default LoggerMiddleware;
