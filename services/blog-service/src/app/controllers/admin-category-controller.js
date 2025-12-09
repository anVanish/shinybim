const httpError = require("../utils/httpError");
const apiResponse = require("../utils/apiResponse");
const Categories = require("../models/Categories");
const Blogs = require("../models/Blogs");
const { default: slugify } = require("slugify");

// /admin/categories

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

        //validate parent is valid or not: parent must exists and not contains blogs
        if (parentId) {
            const parentCategory = await Categories.findById(parentId);
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

//DELETE /:categoryId
exports.deleteEmptyCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        const category = await Categories.findById(categoryId);
        if (!category) throw httpError("Category not found", 404);

        //check if category has children or not
        const hasChildren = await Categories.exists({ parentId: categoryId });
        if (hasChildren) {
            throw httpError(
                "Cannot delete category: it has child categories",
                400
            );
        }

        //check if category has blogs or not
        const hasBlogs = await Blogs.exists({ categoryId: categoryId });
        if (hasBlogs) {
            throw httpError(
                "Cannot delete category: it contains blog posts.",
                400
            );
        }

        await Categories.findByIdAndDelete(categoryId);

        res.json(apiResponse({ message: "Category deleted successfully" }));
    } catch (error) {
        next(error);
    }
};
