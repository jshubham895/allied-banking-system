const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true
	})
	.then(() => {
		// console.log(mongoose.connection);
		console.log("Successfully connected to the NoSQL database");
	})
	.catch((err) => {
		console.log(
			"Could not connect to the database right now. Exiting now...",
			err
		);
		process.exit();
	});

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {
	res.json("Using MongoDB now");
});

require("./app/routes/account.routes.js")(app);

require("./app/routes/transaction.routes.js")(app);

app.listen(3001, () => {
	console.log(`Server is listening at port 3001`);
});
