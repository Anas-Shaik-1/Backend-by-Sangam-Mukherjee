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

        const response = User.create({
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
        console.log(err);
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

        const { _id, role } = user;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const accessToken = jwt.sign(
            { _id, username, role },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
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

module.exports = { login, register };
