const httpError = require("../utils/httpError");
const apiResponse = require("../utils/apiResponse");
const Blogs = require("../models/Blogs");
const Categories = require("../models/Categories");
const { upsertTags } = require("../utils/upsertTags");

// /admin/blogs

//POST /blogs
exports.addBlog = async (req, res, next) => {
    const validatedBlog = req.validatedBlog;

    //check if category exists
    const existCategory = await Categories.exists({
        _id: validatedBlog.categoryId,
    });
    if (!existCategory) throw httpError("Category not found", 404);

    //make sure category not contains child
    const hasChildren = await Categories.exists({
        parentId: validatedBlog.categoryId,
    });
    if (hasChildren)
        throw httpError("Cannot add blog to category contains children");

    //check status
    if (validatedBlog.status === "published")
        validatedBlog.publishedAt = new Date();
    validatedBlog.tag = await upsertTags(validatedBlog.tagNames);

    const blog = await Blogs.create(validatedBlog);

    res.json(
        apiResponse({
            data: {
                blog,
            },
        })
    );
};
