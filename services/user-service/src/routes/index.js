const { welcomeRouter } = require("./router");

exports.route = (app) => {
    app.use("/", welcomeRouter);
};
