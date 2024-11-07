const phone = require("../../Models/Mobile.js");
const profile = require("../../Models/profile.js");

module.exports.addPhoneProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { make, model, imei, purchaseYear, warrantyStatus } = req.body;

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
      make,
      model,
      imei,
      purchaseYear,
      warrantyStatus,
    });

    const userProfile = await profile.findOne({ userId });

    if (phoneDetails) {
      userProfile.userMobiles.push(userProfile._id);
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
      message: "Server problem",
    });
  }
};

module.exports.updatePhoneProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server problem",
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

    const userProfile = await profile({ userId });
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
