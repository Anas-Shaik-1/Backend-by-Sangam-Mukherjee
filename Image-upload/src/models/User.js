const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true,
            lowercase: true,
        },
        password: {
            required: true,
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
