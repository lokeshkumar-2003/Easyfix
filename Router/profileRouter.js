const {
  addProfile,
  updateProfile,
  getProfile,
} = require("../Controllers/profile/userProfile.js");
const router = require("express").Router();

router.post("/profile/:userId", addProfile);
router.put("/profile/:userId", updateProfile);
router.get("/profile/:userId", getProfile);

module.exports = router;
