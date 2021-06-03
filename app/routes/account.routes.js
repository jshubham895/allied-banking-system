module.exports = (app) => {
  const accounts = require("../controllers/account.controller.js");

  app.post("/accounts", accounts.create);

  app.get("/accounts", accounts.findAll);

  app.get("/accounts/:accountId", accounts.findOne);

  app.put("/accounts/:accountId", accounts.update);

  app.delete("/accounts/:accountId", accounts.delete);
};
