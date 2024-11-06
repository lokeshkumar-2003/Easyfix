const express = require("express");
const app = express();
const DBConnection = require("./DbConfig/databaseConfig.js");
require("dotenv").config();
const { PORT } = process.env;

app.listen(PORT, () => {
  DBConnection();
});
