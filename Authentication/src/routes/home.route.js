const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const homeRouter = express.Router();

homeRouter.get("/welcome", authMiddleware, (req, res) => {
    console.log(req.userInfo);

    res.json({ msg: "Hello Bro" });
});

module.exports = homeRouter;
