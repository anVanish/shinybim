const { homeRouter } = require("./router");

exports.route = (app) => {
    app.use("/", homeRouter);
};
