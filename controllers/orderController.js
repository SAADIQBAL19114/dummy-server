const decodeAuth = require("./authController").decodeAuth;

let lastRequestTimestamp = 0;
const subscriptionIdRandom = () => Math.floor(Math.random() * 10000);
const orderIdRandom = () => Math.floor(Math.random() * 10000);

exports.processOrder = (req, res) => {
  const {
    previousOrderId,
    shippingID,
    ipAddress,
    campaignId,
    offers,
    forceGatewayId,
  } = req.body;

  const { authorization } = req.headers;
  const { username, password } = decodeAuth(authorization);
  const currentTimestamp = Date.now();

  if (currentTimestamp - lastRequestTimestamp < 2000) {
    return res.status(429).json({ error: "Too Many Requests" });
  }

  lastRequestTimestamp = currentTimestamp;

  if (username === "admin" && password === "admin") {
    if (shippingID === 8) {
      const subscriptionId = subscriptionIdRandom();
      const response = {
        gateway_id: "1",
        response_code: "100",
        error_found: "0",
        order_id: orderIdRandom(),
        transactionID: "Not Available",
        customerId: "766198",
        orderTotal: "39.99",
        line_items: offers.map((offer) => ({
          product_id: offer.product_id,
          quantity: offer.quantity,
          subscription_id: subscriptionId,
        })),
        resp_msg: "Approved",
      };
      res.json(response);
    } else {
      res.json({
        response_code: 10333,
        error_found: "1",
        error_message: "Order has been blacklisted",
      });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
