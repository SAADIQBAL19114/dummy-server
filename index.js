const express = require("express");
const app = express();
const port = 4200;

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const upsellRoutes = require("./routes/upsellRoutes");

app.use(authRoutes);
app.use(orderRoutes);
app.use(upsellRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
