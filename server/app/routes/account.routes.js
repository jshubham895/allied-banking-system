const { validateToken } = require("../controllers/JWT");

module.exports = (app) => {
	const accounts = require("../controllers/account.controller.js");

	app.post("/accounts/signup", accounts.create);

	app.post("/accounts/login", accounts.login);

	app.get("/accounts", validateToken, accounts.findAll);

	app.get("/accounts/name/:name", accounts.findByName);

	app.get("/accounts/:accountId", validateToken, accounts.findOne);

	app.put("/accounts/:accountId", validateToken, accounts.update);

	app.delete("/accounts/:accountId", accounts.delete);
};
