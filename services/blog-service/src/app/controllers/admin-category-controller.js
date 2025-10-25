const httpError = require("../utils/httpError");
const apiResponse = require("../utils/apiResponse");
const Categories = require("../models/Categories");
const Blogs = require("../models/Blogs");
const { default: slugify } = require("slugify");

// POST /
exports.addCategory = async (req, res, next) => {
    try {
        const { name, description, parentId } = req.body;

        //validate require fields
        if (!name) throw httpError("Category name is required", 400);

        //check if duplicate slug when generating
        const slug = slugify(name, { lower: true, strict: true });
        if (await Categories.exists({ slug })) {
            throw httpError(
                "Duplicate category slug, please use another name",
                409
            );
        }

        //validate parent is valid or not
        let parentCategory = null;
        if (parentId) {
            parentCategory = await Categories.findById(parentId);
            if (!parentCategory)
                throw httpError("Parent category not found", 404);

            //parent category must have not contains any blogs
            const hasBlogs = await Blogs.exists({ categoryId: parentId });
            if (hasBlogs)
                throw httpError(
                    "Cannot add subcategory to category already contains blogs",
                    400
                );
        }

        //save category - trigger pre-save slug generation
        const category = new Categories({ name, description, parentId });
        await category.save();

        //mark parent category as non-leaf
        if (parentCategory) {
            await Categories.findByIdAndUpdate(parentCategory._id, {
                isLeaf: false,
            });
        }

        res.json(
            apiResponse({
                message: "category added successfully",
                data: { category },
            })
        );
    } catch (error) {
        next(error);
    }
};
