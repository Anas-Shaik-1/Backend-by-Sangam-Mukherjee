const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // console.log("This is auth middleware");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No Token found. Pls login to continue",
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = decodedToken;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Access Denied. No Token found. Pls login to continue",
            error: err.message,
        });
    }
};

module.exports = authMiddleware;
