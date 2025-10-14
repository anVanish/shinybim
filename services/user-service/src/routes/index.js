const { welcomeRouter, authRouter, userRouter } = require("./router");
const { authMiddleware } = require("../middlewares/authMiddleware");

exports.route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/me", authMiddleware, userRouter);
    app.use("/api", welcomeRouter);
};
