const express = require("express");
const app = express();
const DBConnection = require("./DbConfig/databaseConfig.js");
require("dotenv").config();
const AuthRoute = require("./Router/authRouter.js");
const { PORT } = process.env;

app.use(express.json());
app.use("/api", AuthRoute);

app.listen(PORT, () => {
  DBConnection();
});
