const jwt = require("jsonwebtoken");
const httpError = require("../app/utils/httpError");

exports.authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer "))
            throw httpError("Missing token", 401);

        const token = authHeader.split(" ")[1];
        console.log(token);
        req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        next();
    } catch (error) {
        next(error);
    }
};
