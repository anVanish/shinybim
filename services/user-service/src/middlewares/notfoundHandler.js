const { errorMessage } = require("../app/utils/apiResponse");

function notfoundHandler(req, res, next) {
    res.status(404).json(
        errorMessage({
            message: "The requested resource was not found on this server",
        })
    );
}

module.exports = notfoundHandler;
