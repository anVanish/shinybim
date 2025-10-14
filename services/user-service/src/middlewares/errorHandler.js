const { errorMessage } = require("../app/utils/apiResponse");

function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).json(errorMessage({ message: err.message }));
}

module.exports = errorHandler;
