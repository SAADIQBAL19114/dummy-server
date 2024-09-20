const { decodeAuth } = require("../utils");

exports.processUpsell = (req, res) => {
  const { authorization } = req.headers;
  const { username, password } = decodeAuth(authorization);
  const { order_id, product_id, new_recurring_date } = req.body;

  if (username === "admin" && password === "admin") {
    res.json({
      order_id: order_id,
      product_id: product_id,
      new_recurring_date: new_recurring_date,
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
