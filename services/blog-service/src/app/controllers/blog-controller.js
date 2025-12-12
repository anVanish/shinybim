const httpError = require("../utils/httpError");
const apiResponse = require("../utils/apiResponse");
const Blogs = require("../models/Blogs");

// /blogs

//GET /
exports.listBlogs = async (req, res, next) => {
    let { page = 0, limit = 6 } = req.query;

    const blogs = await Blogs.find({})
        .limit(limit)
        .skip(page * limit)
        .populate("categoryId");

    const totalBlogs = await Blogs.countDocuments({});

    res.json(
        apiResponse({
            data: {
                page,
                totalBlogs,
                blogs,
            },
        })
    );
};

//GET /:slug
exports.getBlogBySlug = async (req, res, next) => {
    const { slug } = req.params;

    const blog = await Blogs.findOne({ slug }).populate("categoryId");
    if (!blog) throw httpError("Blog not found", 404);

    res.json(
        apiResponse({
            data: {
                blog,
            },
        })
    );
};
