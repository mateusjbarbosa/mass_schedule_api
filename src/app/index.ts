import { Server } from "./server";
const sequelize = require("./app/entities");

(function () {
  new Server(sequelize);
})();
