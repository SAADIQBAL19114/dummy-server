const express = require("express");
const router = express.Router();
const { processUpsell } = require("../controllers/upsellController");

router.post("/process-upsell", processUpsell);

module.exports = router;
