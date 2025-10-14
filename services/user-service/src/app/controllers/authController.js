const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const apiResponse = require("../utils/apiResponse");
const httpError = require("../utils/httpError");
const generateTokens = require("../utils/generateTokens");
const Tokens = require("../models/Tokens");

//POST /auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw httpError("Invalid credentials", 400);

        //check user
        const user = await Users.findOne({ email });
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
