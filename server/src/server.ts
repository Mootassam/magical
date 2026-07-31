/**
 * Starts the application on the port specified.
 */
require("dotenv").config();

import api from "./api";
import { initSocket } from "./socket";
import { databaseInit } from "./database/databaseConnection";
import { startStoreFreezeJob } from "./jobs/storeFreezeJob";

const PORT = process.env.PORT || 8081;

const httpServer = api.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

initSocket(httpServer);

databaseInit().then((database) => startStoreFreezeJob(database));
