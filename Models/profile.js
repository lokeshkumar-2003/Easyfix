const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  userMobiles: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
