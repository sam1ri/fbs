const jwt = require("jsonwebtoken");

const key = require('../config/jwt-key');
const verifyTokenForAdmin = (req, res, next) => {
  const token = req.headers['accesstoken'];
  console.log(token)

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], key);
    req.user = decoded;
    return decoded.role_id == 1 ? next() : res.status(401).json('Access Denied!');
  } 
  catch (err) {
    return res.status(401).json({errMsg: err.name});
  }
};

const verifyTokenForCustomer = (req, res, next) => {
  const token = req.headers['accesstoken'];
  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], key);
    req.user = decoded;
    console.log(decoded);
    return decoded.role_id == 2 ? next() : res.status(401).json('Access Denied!');
  } 
  catch (err) {
    return res.status(401).json({errMsg: err.name});
  }
};

module.exports = {
  isAdmin: verifyTokenForAdmin,
  isCustomer: verifyTokenForCustomer
};
