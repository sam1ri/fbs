const jwt = require("jsonwebtoken");

const key = require('../config/jwt-key');

const verifyTokenForAdmin = (req, res, next) => {
  const token = req.headers['accesstoken'];
  console.log(token)

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  const decoded = jwt.verify(token.split(' ')[1], key);
  try {
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
  return decoded.role_id == 1 ? next() : res.status(401).json('Access Denied!');
};

const verifyTokenForCustomer = (req, res, next) => {
  const token = req.headers['accesstoken'];
  console.log(token)

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  const decoded = jwt.verify(token.split(' ')[1], key);
  try {
    console.log(req.user);
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
  return decoded.role_id == 2 ? next() : res.status(401).json('Access Denied!');
};

module.exports = {
  isAdmin: verifyTokenForAdmin,
  isCustomer: verifyTokenForCustomer
};
