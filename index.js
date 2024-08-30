const express = require("express");
const app = express();
const port = 4200;

app.use(express.json());

const subscriptionIdRandom = () => Math.floor(Math.random() * 10000);
const orderIdRandom = () => Math.floor(Math.random() * 10000);

let lastRequestTimestamp = 0;

app.post("/process-order", (req, res) => {
  const {
    previousOrderId,
    shippingID,
    ipAddress,
    campaignId,
    offers,
    forceGatewayId,
  } = req.body;

  console.log("req,Kkkkkkkkkk", req.body);
  console.log("shippingId == 8", shippingID === 8, typeof(shippingID));
  const authHeader = req.headers.authorization;
  const currentTimestamp = Date.now();
  console.log(">>>>>>>>>>>", currentTimestamp);
  
  if (currentTimestamp - lastRequestTimestamp < 2000) {
    return res.status(429).json({ error: "Too Many Requests" });
  }
  
  lastRequestTimestamp = currentTimestamp;
  console.log(">>>>2222222222>>>>>>>", lastRequestTimestamp);
  
  if (authHeader === "Basic 1392309290") {
    if (shippingID === 8) {
      console.log("shippingId == 8", shippingID === 8);
      const subscriptionId = subscriptionIdRandom() ;
      const response = {
        gateway_id: "1",
        response_code: "100",
        error_found: "0",
        order_id: orderIdRandom(),
        transactionID: "Not Available",
        customerId: "766198",
        authId: "Not Available",
        orderTotal: "39.99",
        orderSalesTaxPercent: "0.00",
        orderSalesTaxAmount: "0.00",
        test: "1",
        prepaid_match: "0",
        line_items: offers.map((offer) => ({
          product_id: offer.product_id,
          variant_id: "0",
          quantity: offer.quantity,
          subscription_id: subscriptionId,
        })),
        subscription_id: offers.reduce((acc, offer) => {
          acc[offer.product_id] = subscriptionId;
          return acc;
        }, {}),
        resp_msg: "Approved",
      };
      res.json(response);
    } else {
      const response = {
        response_code: 10333,
        error_found: "1",
        error_message: "Order has been blacklisted",
      };
      res.json(response);
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/process-upsell", (req, res) => {
  const { order_id, product_id, new_recurring_date } = req.body;
  const authHeader = req.headers.authorization;

  if (authHeader === "Basic 2424424242") {
    // Return the same payload
    res.json({
      order_id: order_id,
      product_id: product_id,
      new_recurring_date: new_recurring_date,
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
