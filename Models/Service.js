const mongoose = require("mongoose");

const OrderServiceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userDetails: {
    userPicture: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phNumber: {
      type: String,
      required: true,
    },
  },
  userMobile: {
    phoneName: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    phonePicture: {
      type: String,
      required: true,
    },
  },
  enquiry: {
    currentPhonePicture: {
      type: String,
      required: true,
    },
    issueDescription: {
      type: String,
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
    },
  },
  orderedPlace: {
    orderId: {
      type: String,
      required: true,
    },
    serviceStoreName: {
      type: String,
      required: true,
    },

    serviceAddress: {
      type: String,
      required: true,
    },
    serviceCoords: {
      lat: {
        type: String,
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
    },

    userAddress: {
      type: String,
      required: true,
    },
    userCoords: {
      lat: {
        type: String,
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
    },

    preferredDate: {
      type: String,
      required: true,
    },
    additionalComments: {
      type: String,
      required: false,
    },
  },
});

module.exports = mongoose.model("OrderService", OrderServiceSchema);
