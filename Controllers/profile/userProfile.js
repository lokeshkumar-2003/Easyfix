const profile = require("../../Models/profile.js");

module.exports.addProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profilePicture, name, email, phone, address } = req.body;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required for storing the profile",
      });
    }

    if (!name && !email && !phone && !address) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userProfile = await profile.create({
      profilePicture,
      name,
      email,
      phone,
      address,
    });

    if (userProfile) {
      return res.status(201).json({
        success: true,
        message: "User profile is created",
        userProfile,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "User profile can't create",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server problem",
    });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profilePicture, name, email, phone, address } = req.body;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required for storing the profile",
      });
    }

    if (!name && !email && !phone && !address) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userProfile = await profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({
        success: true,
        message: "user profile not found",
      });
    }

    userProfile.profilePicture = profilePicture;
    userProfile.name = name;
    userProfile.email = email;
    userProfile.phone = phone;
    userProfile.address = address;

    const updatedProfile = await userProfile.save();

    if (updatedProfile) {
      return res.status(200).json({
        message: "User profile updated successfully",
        status: true,
        updatedProfile,
      });
    } else {
      return res.status(200).json({
        message: "User profile can't update",
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server problem",
    });
  }
};

module.exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required for storing the profile",
      });
    }

    const userProfile = await profile.findOne({ userId });

    if (updatedProfile) {
      return res.status(200).json({
        status: true,
        updatedProfile,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server problem",
      status: false,
    });
  }
};
