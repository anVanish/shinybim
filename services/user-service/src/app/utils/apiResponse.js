function apiResponse({ success = true, message = "", data = {} }) {
    return {
        success,
        message,
        data,
    };
}

module.exports = apiResponse;
