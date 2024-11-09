const Enquiry = require("../../Models/Service.js");
const Profile = require("../../Models/profile.js");
const { v4: uuidv4 } = require("uuid");

module.exports.addEnquiry = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required",
      });
    }

    const userProfile = await Profile.findOne({ userId });

    const {
      userMobile: { phonePicture, phoneName, model },
      enquiry: {
        currentPhonePicture,
        issueDescription,
        urgencyLevel,
        pickupDate,
        comments,
      },
      orderedPlace: {
        serviceCoords,
        userCoords,
        serviceStoreName,
        userAddress,
        serviceAddress,
        preferredDate,
        additionalComments,
      },
    } = req.body;

    if (!userProfile) {
      return res.status(404).json({
        status: true,
        message: "User profile is not found",
      });
    }

    const userName = await userProfile?.name;
    const userPicture = await userProfile?.profilePicture;
    const email = await userProfile?.email;
    const phNumber = await userProfile?.phone;

    const orderId = await uuidv4();

    const newEnquiry = await Enquiry.create({
      userId,
      userDetails: {
        userName,
        userPicture,
        email,
        phNumber,
      },
      userMobile: {
        phoneName,
        model,
        phonePicture,
      },
      enquiry: {
        currentPhonePicture,
        issueDescription,
        urgencyLevel,
        pickupDate,
        comments,
      },
      orderedPlace: {
        orderId,
        serviceStoreName,
        serviceAddress,
        serviceCoords: {
          ...serviceCoords,
        },
        userAddress,
        userCoords: {
          ...userCoords,
        },
        preferredDate,
        additionalComments,
      },
    });

    if (newEnquiry) {
      return res.status(201).json({
        success: true,
        message: "Complaint has been registered",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while register the complaint",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
