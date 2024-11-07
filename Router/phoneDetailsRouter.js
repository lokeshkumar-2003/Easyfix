const {
  addPhoneProfile,
  updatePhoneProfile,
  getPhoneProfile,
  getSinglePhoneProfile,
} = require("../Controllers/phone/phoneDetails.js");

const router = require("express").Router();

router.get("/phone/:userId", getPhoneProfile);
router.get("/phone/:userId/:mobileId", getSinglePhoneProfile);
router.post("/phone/:userId", addPhoneProfile);
router.put("/phone/:userId/:mobileId", updatePhoneProfile);

module.exports = router;
