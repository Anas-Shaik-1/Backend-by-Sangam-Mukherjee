const adminMiddleware = (req, res, next) => {
    if (req.userInfo.role == "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            msg: "Admin Rights required!",
        });
    }
};

module.exports = adminMiddleware;
