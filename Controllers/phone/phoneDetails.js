const mongoose = require("mongoose");
const profile = require("../../Models/profile.js");
const { v4: uuidv4 } = require("uuid");

const uploadImageByUrl = require("../../Util/imageUploader.js"); // Import Cloudinary function

module.exports.addPhoneProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { make, model, imei, purchaseYear, warrantyStatus } = req.body;
    const phonePicture = req.file;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!make || !model) {
      return res.status(400).json({
        success: false,
        message: "Make and model are required fields",
      });
    }

    // Find user profile by userId
    const userProfile = await profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    // Generate unique mobileId
    const mobileId = uuidv4();

    // Upload phone picture to Cloudinary if available
    let imageUrl = "";
    if (phonePicture) {
      const uploadResult = await uploadImageByUrl(phonePicture.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // Add new phone details to userMobiles array
    userProfile.userMobiles.push({
      mobileId,
      make,
      model,
      imei,
      purchaseYear,
      warrantyStatus,
      phonePicture: imageUrl,
    });

    // Save updated user profile
    await userProfile.save();

    return res.status(201).json({
      success: true,
      message: "Mobile details stored successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updatePhoneProfile = async (req, res) => {
  try {
    const { userId, mobileId } = req.params;
    const { make, model, imei, purchaseYear, warrantyStatus } = req.body;

    const { phonePicture } = req.file;

    if (!userId || !mobileId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Mobile ID are required",
      });
    }

    const userProfile = await profile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    const mobileToUpdate = userProfile.userMobiles.find(
      (mobile) => mobile.mobileId === mobileId
    );

    if (!mobileToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Mobile not found in user's profile",
      });
    }
    let imageUrl = "";
    if (phonePicture) {
      const uploadResult = await uploadImageByUrl(phonePicture.buffer);
      imageUrl = uploadResult.secure_url;
    }

    if (make) mobileToUpdate.make = make;
    if (model) mobileToUpdate.model = model;
    if (imei) mobileToUpdate.imei = imei;
    if (purchaseYear) mobileToUpdate.purchaseYear = purchaseYear;
    if (warrantyStatus) mobileToUpdate.warrantyStatus = warrantyStatus;
    if (phonePicture) mobileToUpdate.phonePicture = imageUrl;

    await userProfile.save();

    return res.status(200).json({
      success: true,
      message: "Mobile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getPhoneProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userProfile = await profile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      userMobiles: userProfile.userMobiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports.getSinglePhoneProfile = async (req, res) => {
  try {
    const { userId, mobileId } = req.params;

    if (!userId || !mobileId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Mobile ID are required",
      });
    }

    const userProfile = await profile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    const userMobile = userProfile.userMobiles.find(
      (mobile) => mobile.mobileId === mobileId
    );

    if (!userMobile) {
      return res.status(404).json({
        success: false,
        message: "Mobile data not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userMobile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
