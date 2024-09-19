const decodeAuth = (authorization) => {
  const decodedAuth = Buffer.from(
    authorization.split(" ")[1],
    "base64"
  ).toString("utf-8");
  const [username, password] = decodedAuth.split(" ");
  return { username, password };
};

exports.authenticate = (req, res) => {
  const { authorization } = req.headers;
  const { username, password } = decodeAuth(authorization);
  if (username === "admin" && password === "admin") {
    res.status(200).json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
