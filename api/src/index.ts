// Lib
import express from "express";
import helmet from "helmet";

import Logger from "@logger";
import MigrationsModel from "@models/migrationsModel";
import router from "@router";
import IpController from "@controllers/ipController";

// Data
const PORT = process.env.PORT;
const app = express();

// Code
async function main() {
  const logger = Logger.getLogger("SERVER");

  // Start the migrations.
  await MigrationsModel.up();

  // Setup the app.
  app.use(helmet());
  app.use(router);

  // Sync the new ips to the database.
  await IpController.addIpsToTable(logger);

  // Start the server.
  app.listen(PORT, () => {
    logger.info(`The API is online on port: ${PORT}`);
  });
}

main();
