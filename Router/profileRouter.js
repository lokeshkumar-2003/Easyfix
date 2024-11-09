const {
  addProfile,
  updateProfile,
  getProfile,
} = require("../Controllers/profile/userProfile.js");
const router = require("express").Router();
const multer = require("multer");
const upload = multer();

router.post("/profile/:userId", upload.single("profilePicture"), addProfile);
router.put("/profile/:userId", upload.single("profilePicture"), updateProfile);
router.get("/profile/:userId", getProfile);

module.exports = router;
