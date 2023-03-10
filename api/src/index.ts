// Lib
import express from "express";
import helmet from "helmet";

import router from "@router";
import MigrationsModel from "@models/migrationsModel";

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
    console.log(`The API is online on port: ${PORT}`);
  });
}

main();
