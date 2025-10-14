const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const apiResponse = require("../utils/apiResponse");
const httpError = require("../utils/httpError");
const generateTokens = require("../utils/generateTokens");
const Tokens = require("../models/Tokens");
const jwt = require("jsonwebtoken");

//POST /auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw httpError("Invalid credentials", 400);

        //check user
        const user = await Users.findOne({ email }).select("+password");
        if (!user) throw httpError("Email not found", 401);
        if (!bcrypt.compareSync(password, user.password))
            throw httpError("Password incorrect", 401);

        //generate token
        const { accessToken, refreshToken } = generateTokens(user.toObject());
        await Tokens.create({ userId: user._id, token: refreshToken });

        res.json(
            apiResponse({
                data: {
                    accessToken,
                    refreshToken,
                },
            })
        );
    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw httpError("Missing refresh token", 401);

        //check in database
        const stored = await Tokens.findOne({ token: refreshToken });
        if (!stored) throw httpError("Invalid refresh token", 403);

        //get user from token
        const decodedUser = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
        const user = await Users.findById(decodedUser._id);
        if (!user) throw httpError("User not found", 404);

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            user.toObject()
        );
        stored.token = newRefreshToken;
        await stored.save();

        res.json(
            apiResponse({
                message: "Token refreshed",
                data: {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
            })
        );
    } catch (error) {
        next(error);
    }
};
