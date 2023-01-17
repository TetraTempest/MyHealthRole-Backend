const jwt = require("jsonwebtoken");

const passwordToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      success: false,
      message: "No Password Token",
    });
  }

  const token = req.headers.authorization.split(" ").pop();

  if (token) {
    jwt.verify(token, process.env.TOKEN_PASSWORD, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid Token",
          err,
        });
      } else {
        req.passwordToken = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "No password token provided",
    });
  }
};

module.exports = passwordToken;
