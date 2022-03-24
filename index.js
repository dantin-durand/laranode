import http from "http";
import router from "./routes/index.js";

import APP from "./config/app.js";
import { bodyParser } from "./helpers/bodyParser.js";

const server = http.createServer(async (req, res) => {
  await bodyParser(req);
  router(req, res);
});

server.listen(APP.PORT, () => {
  console.log(`Server is running on port ${APP.PORT}`);
});
