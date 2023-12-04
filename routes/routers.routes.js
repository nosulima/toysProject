const usersR = require("./user.routes");
const toysR = require("./toy.routes");

exports.routesInit = (app) => {
  app.use("/users",usersR);
  app.use("/toys",toysR)
}