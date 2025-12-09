const express = require("express");
const router = express.Router();
const {
    addCategory,
    deleteEmptyCategory,
} = require("../../app/controllers/admin-category-controller");

router.delete("/:categoryId", deleteEmptyCategory);
router.post("/", addCategory);

module.exports = router;
