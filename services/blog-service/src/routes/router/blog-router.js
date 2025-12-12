const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../app/utils/catchAsync");
const {
    listBlogs,
    getBlogBySlug,
} = require("../../app/controllers/blog-controller");

router.get("/", catchAsync(listBlogs));
router.get("/:slug", catchAsync(getBlogBySlug));

module.exports = router;
