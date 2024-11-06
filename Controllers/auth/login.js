const User = require("../../Models/user.js");
const validator = require("validator");
const JsonToken = require("../../Util/jsonToken.js");
const { hashCompare } = require("../../Util/auth.js");

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter strong password and valid email address",
      });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter valid email id" });
    }

    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email or not registered",
      });
    }

    const auth = await hashCompare(password, isUser.password);

    if (!auth) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (isUser) {
      const token = await JsonToken(isUser._id);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        jwt: token,
      });
    }
    next();
  } catch (error) {
    console.log("Login", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = Login;
