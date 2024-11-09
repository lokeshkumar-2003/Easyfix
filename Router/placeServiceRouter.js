const { addEnquiry } = require("../Controllers/enquiry/placeService");
const router = require("express").Router();

router.post("/enquiry/:userId", addEnquiry);

module.exports = router;
