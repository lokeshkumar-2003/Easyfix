const Enquiry = require("../../Models/Service.js");
const Profile = require("../../Models/profile.js");
const { v4: uuidv4 } = require("uuid");

module.exports.addEnquiry = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required",
      });
    }

    const userProfile = await Profile.findOne({ userId });

    const {
      phonePicture,
      phoneName,
      model,
      currentPhonePicture,
      issueDescription,
      urgencyLevel,
      pickupDate,
      comments,
      userAddress,
      serviceAddress,
      preferredDate,
      additionalComments,
    } = req.body;

    if (!urgencyLevel && !pickupDate && !issueDescription) {
      return res.status(404).json({
        success: false,
        message: "Urgencylevel, pickupdate, issue is reqired",
      });
    }

    if (!userProfile) {
      return res.status(404).json({
        status: true,
        message: "User profile is not found",
      });
    }

    const userName = await userProfile?.name;
    const userPicture = await userProfile?.profilePicture;
    const userEmail = await userProfile?.email;
    const userPhoneNumber = await userProfile?.phone;

    const orderId = await uuidv4();

    const newEnquiry = await Enquiry.create({
      userId,
      userDetails: {
        userName,
        userPicture,
        userEmail,
        userPhoneNumber,
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
        userAddress,
        serviceAddress,
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
