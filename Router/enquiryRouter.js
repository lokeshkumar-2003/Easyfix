const { addEnquiry } = require("../Controllers/enquiry/enquiryController");
const router = require("express").Router();

router.post("enquiry:userId", addEnquiry);

module.exports = router;
