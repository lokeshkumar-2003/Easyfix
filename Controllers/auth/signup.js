const User = require("../../Models/user.js");
const validator = require("validator");
const JsonToken = require("../../Util/jsonToken.js");
const { hashPassword } = require("../../Util/auth.js");

const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPass = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPass,
      otp: null,
    });

    const token = await JsonToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      jwt: token,
    });

    next();
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = Signup;
