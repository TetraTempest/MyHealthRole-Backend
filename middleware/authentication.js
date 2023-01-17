const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            success: false,
            message: "Invalid authentication",
        });
    }
    const token = req.headers.authorization.split(" ").pop();

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return status(401).json({
                    success: false,
                    message: "Invalid token",
                    err,
                });
            } else {
                req.token = decoded
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
};

module.exports = authentication;