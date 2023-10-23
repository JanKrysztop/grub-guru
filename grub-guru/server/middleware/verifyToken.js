const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
//TODO: change this to arrow function
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  console.log("Token from cookies:", token);
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
