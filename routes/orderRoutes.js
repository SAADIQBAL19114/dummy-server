const express = require("express");
const router = express.Router();
const { processOrder } = require("../controllers/orderController");

router.post("/process-order", processOrder);

module.exports = router;
