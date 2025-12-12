const express = require("express");
const router = express.Router();

const { catchAsync } = require("../../app/utils/catchAsync");

const {
    addCategory,
    deleteEmptyCategory,
    updateCategory,
} = require("../../app/controllers/admin-category-controller");

router.put("/:categoryId", catchAsync(updateCategory));
router.delete("/:categoryId", catchAsync(deleteEmptyCategory));
router.post("/", catchAsync(addCategory));

module.exports = router;
