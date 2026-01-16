const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const adminRouter = express.Router();

adminRouter.get("/", authMiddleware, adminMiddleware, (req, res) => {
    res.send({ msg: "Welcome to admin route" });
});

module.exports = adminRouter;
