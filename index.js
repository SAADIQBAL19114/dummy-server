const express = require("express");
const app = express();
const port = 4200;

app.use(express.json());

const generateRandomString = () => Math.random().toString(36).substring(2, 15);

app.post("/process-order", (req, res) => {
  const {
    previousOrderId,
    shippingId,
    ipAddress,
    campaignId,
    offers,
    forceGatewayId,
  } = req.body;
  const authHeader = req.headers.authorization;

  if (authHeader === "Basic 1392309290") {
    if (shippingId === "8") {
      const subscriptionId = generateRandomString();
      const response = {
        gateway_id: "1",
        response_code: "100",
        error_found: "0",
        order_id: generateRandomString(),
        transactionID: "Not Available",
        customerId: "766198",
        authId: "Not Available",
        orderTotal: "39.99",
        orderSalesTaxPercent: "0.00",
        orderSalesTaxAmount: "0.00",
        test: "1",
        prepaid_match: "0",
        line_items: offers.map((offer) => ({
          product_id: offer.product_id.toString(),
          variant_id: "0",
          quantity: offer.quantity.toString(),
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
