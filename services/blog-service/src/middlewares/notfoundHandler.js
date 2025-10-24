const apiResponse = require("../app/utils/apiResponse");

exports.notfoundHandler = (req, res, next) => {
    res.status(404).json(
        apiResponse({
            success: false,
            message: "The requested resource was not found on this server",
        })
    );
};
