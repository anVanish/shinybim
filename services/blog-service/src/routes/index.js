const { welcomeRouter } = require("./router");
const { authMiddleware } = require("../middlewares/authMiddleware");

exports.route = (app) => {
    app.use("/api", welcomeRouter);
};
