module.exports = (app) => {
  const transactions = require("../controllers/transaction.controller.js");

  app.post("/transactions", transactions.create);

  app.get("/transactions", transactions.findAll);
  
  app.get("/transactions/from/:from", transactions.findOneFrom);
  
  app.get("/transactions/to/:to", transactions.findOneTo);

  
};
