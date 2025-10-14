const Users = require("../models/Users");
const apiResponse = require("../utils/apiResponse");
const httpError = require("../utils/httpError");
const { safeUser, safeUpdateUser } = require("../utils/sanitizeUser");

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
                message: "update successfully",
                data: { user: safeUser(updatedUser) },
            })
        );
    } catch (error) {
        next(error);
    }
};
