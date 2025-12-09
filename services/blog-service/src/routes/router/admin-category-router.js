const express = require("express");
const router = express.Router();

const { catchAsync } = require("../../app/utils/catchAsync");

const {
    addCategory,
    deleteEmptyCategory,
} = require("../../app/controllers/admin-category-controller");

router.delete("/:categoryId", catchAsync(deleteEmptyCategory));
router.post("/", catchAsync(addCategory));

module.exports = router;
