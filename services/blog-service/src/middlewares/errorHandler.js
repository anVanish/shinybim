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
    if (err.code === 11000) {
        const duplicatedField = Object.keys(err.keyPattern)[0];
        const value = err.keyValue[duplicatedField];
        err.message = `${duplicatedField} "${value}" already exists`;
        statusCode = 400;
    } else if (err.name === "ValidationError") {
        if (err.details) {
            err.message = "ValidationError";
            err.details = err.details && err.details.map((d) => d.message);
        }
        statusCode = 400;
    }

    console.error(err);
    res.status(statusCode).json({
        ...apiResponse({
            success: false,
            message: err.message,
        }),
        details: err.details,
    });
};
