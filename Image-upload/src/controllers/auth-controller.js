const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ $or: [{ username, email }] });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User with Email or UserName already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const response = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (response) {
            return res.status(201).json({
                success: true,
                message: "User Registered Successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Something Went Wrong Please Try again",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            msg: "Server Error",
        });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const { _id, role } = user;

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const accessToken = jwt.sign(
            { userId: _id, username, role },
            process.env.JWT_SECRET,
            {
                expiresIn: "15min",
            },
        );
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
            msg: "Server Error",
        });
    }
};
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword1, newPassword2 } = req.body;

        const { userId } = req.userInfo;

        const user = await User.findById(userId);

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            user.password,
        );

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect. Please try again.",
            });
        }
        if (newPassword1 !== newPassword2) {
            return res.status(400).json({
                success: false,
                message: "New Password didn't match. Please try again.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(newPassword1, salt);

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });
    } catch (err) {
        // console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message,
            msg: "Server Error",
        });
    }
};

module.exports = { login, register, changePassword };
