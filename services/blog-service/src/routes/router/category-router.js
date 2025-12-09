const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../app/utils/catchAsync");
const {
    getCategoriesList,
} = require("../../app/controllers/category-controller");

router.get("/", catchAsync(getCategoriesList));

module.exports = router;
