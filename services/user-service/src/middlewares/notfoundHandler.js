const apiResponse = require("../app/utils/apiResponse");

function notfoundHandler(req, res, next) {
    res.status(404).json(
        apiResponse({
            success: false,
            message: "The requested resource was not found on this server",
        })
    );
}

module.exports = notfoundHandler;
