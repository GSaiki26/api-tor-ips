// Libs
import Logger from "@logger";
import DeletedIpsModel from "@models/deletedIpsModel";

// Classes
class MigrationsModel {
  public static async up(): Promise<void> {
    const logger = Logger.getLogger("SERVER");
    logger.info("Starting migrations...");

    await DeletedIpsModel.sync();

    logger.info("The migration was concluded.");
  }
}

// Code
export default MigrationsModel;
