import { Server } from "./server";
const sequelize = require("./entities");

(function () {
  new Server(sequelize);
})();
