const router = require("express").Router();
const Login = require("../Controllers/auth/login.js");
const Signup = require("../Controllers/auth/signup.js");

router.post("/auth/signup", Signup);
router.post("/auth/login", Login);

module.exports = router;
