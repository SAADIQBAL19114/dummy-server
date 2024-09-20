exports.decodeAuth = (authorization) => {
  const decodedAuth = Buffer.from(
    authorization.split(" ")[1],
    "base64"
  ).toString("utf-8");
  const [username, password] = decodedAuth.split(" ");
  return { username, password };
};
