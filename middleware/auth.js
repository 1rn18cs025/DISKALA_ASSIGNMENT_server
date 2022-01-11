const jwt = require("jsonwebtoken");
const requiresAuth = process.env.REQUIRES_AUTH;
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

module.exports = function (req, res, next) {
  if (!requiresAuth) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};