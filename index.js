const express = require("express");
const app = express();
const DBConnection = require("./DbConfig/databaseConfig.js");
require("dotenv").config();
const ProfileRoute = require("./Router/profileRouter.js");
const AuthRoute = require("./Router/authRouter.js");
const PhoneDetailRoute = require("./Router/phoneDetailsRouter.js");
const EnquiryRoute = require("./Router/enquiryRouter.js");
const { PORT } = process.env;

app.use(express.json());
app.use("/api", AuthRoute);
app.use("/api", ProfileRoute);
app.use("/api", PhoneDetailRoute);
app.use("/api", EnquiryRoute);

app.listen(PORT, () => {
  DBConnection();
});
