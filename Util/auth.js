const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports.hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
