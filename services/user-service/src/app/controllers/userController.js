const Users = require("../models/Users");
const apiResponse = require("../utils/apiResponse");

exports.profile = async (req, res, next) => {
    try {
        res.json(
            apiResponse({
                data: {
                    user: {
                        _id: req.user._id,
                        email: req.user.email,
                        name: req.user.name,
                        avatarUrl: req.user.avatarUrl,
                        isAdmin: req.user.isAdmin,
                    },
                },
            })
        );
    } catch (error) {
        next(error);
    }
};
