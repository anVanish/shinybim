function httpError(message, statusCode = 500) {
    const error = new Error(message);
    error.statusCode = statusCode;
}

module.exports = httpError;
