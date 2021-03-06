import { init } from "$/src/app";
import { API_SERVER_PORT } from "$/configs/envValues";

const server = init();
server.listen(API_SERVER_PORT, "0.0.0.0").then(() => {
  // PM2 graceful start
  // See also https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
  server.log.info("ready");
  process.send?.("ready");
});
