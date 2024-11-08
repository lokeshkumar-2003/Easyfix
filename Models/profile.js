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
    type: [
      {
        mobileId: {
          type: String,
          reqired: true,
        },
        make: {
          type: String,
          reqired: true,
        },
        model: {
          type: String,
          required: true,
        },
        phonePicture: {
          type: String,
          required: true,
        },
        imei: {
          type: String,
          required: false,
          unique: true,
        },
        purchaseYear: {
          type: String,
          required: false,
        },
        warrantyStatus: {
          type: String,
          required: false,
          enum: ["In Warranty", "Out of Warranty"],
        },
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
