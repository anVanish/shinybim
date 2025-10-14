const jwt = require("jsonwebtoken");

function generateTokens(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return { accessToken, refreshToken };
}

module.exports = generateTokens;
