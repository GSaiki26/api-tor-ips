// Lib
import express from "express";
import helmet from "helmet";


import Logger from "@logger";
import MigrationsModel from "@models/migrationsModel";
import router from "@router";

// Data
const PORT = process.env.PORT;
const app = express();

// Code
async function main() {
  // Start the migrations.
  await MigrationsModel.up();

  // Setup the app.
  app.use(helmet());
  app.use(router);

  // Start the server.
  app.listen(PORT, () => {
    const logger = Logger.getLogger("SERVER");
    logger.info(`The API is online on port: ${PORT}`);
  });
}

main();
