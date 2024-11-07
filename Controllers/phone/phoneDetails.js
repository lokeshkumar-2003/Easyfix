const phone = require("../../Models/Mobile.js");
const profile = require("../../Models/profile.js");

module.exports.addPhoneProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { make, model, imei, purchaseYear, warrantyStatus, phonePicture } =
      req.body;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required",
      });
    }

    if (!make && !model && !imei && !purchaseYear && !warrantyStatus) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const phoneDetails = await phone.create({
      userId,
      phonePicture,
      make,
      model,
      imei,
      purchaseYear,
      warrantyStatus,
    });

    const userProfile = await profile.findOne({ userId });

    if (phoneDetails) {
      userProfile.userMobiles.push(phoneDetails._id);
      await userProfile.save();
      return res.status(201).json({
        success: true,
        message: "Mobile details stored successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Mobile details can't store",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updatePhoneProfile = async (req, res) => {
  try {
    const { make, model, imei, purchaseYear, warrantyStatus, phonePicture } =
      req.body;
    const { userId, mobileId } = req.params;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!make && !model && !imei && !purchaseYear && !warrantyStatus) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    const userProfile = await profile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    const toUpdateMobileId = userProfile.userMobiles.find(
      (mobile) => mobile == mobileId
    );

    if (!toUpdateMobileId) {
      return res.status(404).json({
        success: false,
        message: "Mobile not found in user's profile",
      });
    }

    const toUpdateMobile = await phone.findById(toUpdateMobileId);
    if (!toUpdateMobile) {
      return res.status(404).json({
        success: false,
        message: "Mobile record not found",
      });
    }

    toUpdateMobile.phonePicture = phonePicture || toUpdateMobile.phonePicture;
    toUpdateMobile.purchaseYear = purchaseYear || toUpdateMobile.purchaseYear;
    toUpdateMobile.make = make || toUpdateMobile.make;
    toUpdateMobile.imei = imei || toUpdateMobile.imei;
    toUpdateMobile.warrantyStatus =
      warrantyStatus || toUpdateMobile.warrantyStatus;
    toUpdateMobile.model = model || toUpdateMobile.model;

    const updateMobileDetails = await toUpdateMobile.save();

    return res.status(200).json({
      success: true,
      message: "Mobile updated successfully",
      data: updateMobileDetails,
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
      return res.status(404).json({
        message: "User id is required",
        success: false,
      });
    }

    const userProfile = await profile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({
        message: "User profile is not found",
        success: false,
      });
    }

    const userMobiles = userProfile.userMobiles;

    const userMobilesList = await Promise.all(
      userMobiles.map(async (mobileId) => {
        return await phone.findById(mobileId);
      })
    );

    return res.status(200).json({
      success: true,
      userMobilesList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server problem",
    });
  }
};

module.exports.getSinglePhoneProfile = async (req, res) => {
  try {
    const { userId, mobileId } = req.params;

    if (!userId) {
      return res.status(404).json({
        message: "User ID is required",
        success: false,
      });
    }

    if (!mobileId) {
      return res.status(404).json({
        message: "Phone ID is required",
        success: false,
      });
    }

    const userProfile = await profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({
        message: "User profile not found",
        success: false,
      });
    }

    // Find the mobile ID in userMobiles array
    const userPhoneId = userProfile.userMobiles.find(
      (mobile) => mobile === mobileId
    );

    if (!userPhoneId) {
      return res.status(404).json({
        message: "Phone ID not found in user's profile",
        success: false,
      });
    }

    // Find the mobile document by its ID
    const userMobile = await phone.findById(userPhoneId);

    if (userMobile) {
      return res.status(200).json({
        success: true,
        data: userMobile,
      });
    } else {
      return res.status(404).json({
        message: "Mobile data not found",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
