const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log(
      "Could not connect to the database right now. Exiting now...",
      err
    );
    process.exit();
  });

app.get("/", (req, res) => {
  res.json("Database connected successfully.");
});

require("./app/routes/account.routes.js")(app);

require("./app/routes/transaction.routes.js")(app);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is listening at port ${process.env.PORT} `);
});
