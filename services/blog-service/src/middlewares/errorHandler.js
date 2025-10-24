const apiResponse = require("../app/utils/apiResponse.js");

exports.errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    if (err.name === "TokenExpiredError") {
        err.message = "Access token expired";
        statusCode = 401;
    }
    if (err.name === "JsonWebTokenError") {
        err.message = "Invalid access token";
        statusCode = 403;
    }

    console.error(err);
    res.status(statusCode).json(
        apiResponse({
            success: false,
            message: err.message,
        })
    );
};
