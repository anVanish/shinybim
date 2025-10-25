const httpError = require("../utils/httpError");
const apiResponse = require("../utils/apiResponse");
const Categories = require("../models/Categories");

//GET /
exports.getCategoriesList = async (req, res, next) => {
    try {
        const categories = await Categories.find({});

        res.json(
            apiResponse({
                data: {
                    total: categories.length,
                    categories,
                },
            })
        );
    } catch (error) {
        next(error);
    }
};
