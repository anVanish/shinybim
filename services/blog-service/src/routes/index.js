const {
    welcomeRouter,
    categoryRouter,
    adminCategoryRouter,
    blogRouter,
    adminBlogRouter,
} = require("./router");
const { authMiddleware } = require("../middlewares/authMiddleware");

exports.route = (app) => {
    app.use("/api/categories", categoryRouter);
    app.use("/api/admin/categories", adminCategoryRouter);

    app.use("/api/blogs", blogRouter);
    app.use("/api/admin/blogs", adminBlogRouter);

    app.use("/api", welcomeRouter);
};
