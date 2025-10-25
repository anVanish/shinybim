const {
    welcomeRouter,
    categoryRouter,
    adminCategoryRouter,
} = require("./router");
const { authMiddleware } = require("../middlewares/authMiddleware");

exports.route = (app) => {
    app.use("/api/categories", categoryRouter);
    app.use("/api/admin/categories", adminCategoryRouter);
    app.use("/api", welcomeRouter);
};
