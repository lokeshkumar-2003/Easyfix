const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  phonePicture: {
    type: String,
    default: null,
    required: false,
  },
  urgencyLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  pickupDate: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
