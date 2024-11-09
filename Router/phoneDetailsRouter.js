const {
  addPhoneProfile,
  updatePhoneProfile,
  getPhoneProfile,
  getSinglePhoneProfile,
} = require("../Controllers/phone/phoneDetails.js");

const multer = require("multer");
const upload = multer();
const router = require("express").Router();

router.get("/phone/:userId", getPhoneProfile);
router.get("/phone/:userId/:mobileId", getSinglePhoneProfile);

router.post("/phone/:userId", upload.single("phonePicture"), addPhoneProfile);
router.put(
  "/phone/:userId/:mobileId",
  upload.single("phonePicture"),
  updatePhoneProfile
);

module.exports = router;
