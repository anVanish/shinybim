const mongoose = require("mongoose");

const Users = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true, select: false },
        avatarURL: { type: String },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", Users);
