// Libs
import winston, { createLogger, transports } from "winston";
const { combine, printf, timestamp, colorize } = winston.format;

// Classes
class Logger {
  /**
   * A method to create the default logger.
   * @param owner - The logger's owner. The owner will be mentioned in all logs.
   */
  public static getLogger(owner: string): winston.Logger {
    // Return the logger;
    const format = printf(
      (info) => `${info.timestamp} (${owner}) - [${info.level}] ${info.message}`
    );

    return createLogger({
      level: "ERROR" ? process.env.NODE_ENV : "INFO",
      transports: [new transports.Console()],
      format: combine(
        colorize(),
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format
      ),
    });
  }
}

// Code
export default Logger;
