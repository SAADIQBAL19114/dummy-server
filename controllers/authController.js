const { decodeAuth } = require("../utils");
exports.authenticate = (req, res) => {
  const { authorization } = req.headers;
  const { username, password } = decodeAuth(authorization);
  if (username === "admin" && password === "admin") {
    res.status(200).json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
