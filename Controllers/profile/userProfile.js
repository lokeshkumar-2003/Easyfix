const profile = require("../../Models/profile.js");

const uploadImageByUrl = require("../../Util/imageUploader.js"); // Import Cloudinary function

module.exports.addProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, address } = req.body;
    const profilePicture = req.file;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID is required for storing the profile",
      });
    }

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required fields",
      });
    }

    let imageUrl = "";
    if (profilePicture) {
      const uploadResult = await uploadImageByUrl(profilePicture.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const userProfile = await profile.create({
      userId,
      profilePicture: imageUrl,
      name,
      email,
      phone,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "User profile created",
      profile: { ...userProfile._doc },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, address } = req.body;
    const profilePicture = req.file;
    let imageUrl = "";
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
    if (profilePicture) {
      const uploadResult = await uploadImageByUrl(profilePicture.buffer);
      imageUrl = uploadResult.secure_url;
    }

    if (imageUrl) userProfile.profilePicture = imageUrl;
    if (name) userProfile.name = name;
    if (email) userProfile.email = email;
    if (phone) userProfile.phone = phone;
    if (address) userProfile.address = address;

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
      message: err.message,
    });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required for storing the profile",
      });
    }

    const userProfile = await profile.findOne({ userId });

    if (userProfile) {
      return res.status(200).json({
        status: true,
        userProfile,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server problem",
      status: false,
    });
  }
};
