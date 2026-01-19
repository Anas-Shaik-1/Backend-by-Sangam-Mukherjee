const express = require("express");
const {
    register,
    login,
    changePassword,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/change-password", authMiddleware, changePassword);

module.exports = authRouter;
