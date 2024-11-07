const mongoose = require("mongoose");

const MobileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  phonePicture: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
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
});

module.exports = mongoose.model("Mobile", MobileSchema);
