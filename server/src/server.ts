/**
 * Starts the application on the port specified.
 */
require("dotenv").config();

import api from "./api";
import { initSocket } from "./socket";

const PORT = process.env.PORT || 8081;

const httpServer = api.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

initSocket(httpServer);
