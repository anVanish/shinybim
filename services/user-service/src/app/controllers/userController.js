const { BaseCollection } = require("mongoose");
const Users = require("../models/Users");
const apiResponse = require("../utils/apiResponse");
const httpError = require("../utils/httpError");
const { safeUser, safeUpdateUser } = require("../utils/sanitizeUser");
const bcrypt = require("bcryptjs");

//POST /users/me
exports.profile = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user._id });
        res.json(
            apiResponse({
                data: safeUser(user.toObject()),
            })
        );
    } catch (error) {
        next(error);
    }
};

//PUT /users/me
exports.updateProfile = async (req, res, next) => {
    try {
        const user = await Users.findById(req.user._id);
        if (!user) throw httpError("User not found", 404);

        const updatedUser = await Users.findByIdAndUpdate(
            req.user._id,
            safeUpdateUser(req.body),
            { new: true, runValidators: true }
        );

        res.json(
            apiResponse({
                message: "Profile updated",
                data: { user: safeUser(updatedUser) },
            })
        );
    } catch (error) {
        next(error);
    }
};

//PUT /users/me/password
exports.updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmedPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmedPassword)
            throw httpError("Missing required field", 400);
        if (newPassword !== confirmedPassword)
            throw httpError("New password do not match", 400);

        const user = await Users.findById(req.user._id).select("+password");
        if (!user) throw httpError("User not found", 404);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw httpError("Incorrect old password", 401);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json(apiResponse({ message: "Password updated" }));
    } catch (error) {
        next(error);
    }
};
