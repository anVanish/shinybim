const { welcomeRouter, authRouter } = require("./router");

exports.route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api", welcomeRouter);
};
