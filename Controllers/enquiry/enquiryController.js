const Enquiry = require("../../Models/Enquiry.js");

module.exports.addEnquiry = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required",
      });
    }

    const {
      phonePicture,
      issueDescription,
      urgencyLevel,
      pickupDate,
      comments,
    } = req.body;

    if (!urgencyLevel && !pickupDate && !issueDescription) {
      return res.status(404).json({
        success: false,
        message: "Urgencylevel, pickupdate, issue is reqired",
      });
    }

    const newEnquiry = await Enquiry.create({
      userId,
      phonePicture,
      issueDescription,
      urgencyLevel,
      pickupDate,
      comments,
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
