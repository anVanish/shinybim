const express = require("express");
const router = express.Router();
const { addBlog } = require("../../app/controllers/admin-blog-controller");
const { validate } = require("../../middlewares/validate");
const { addBlogSchema } = require("../../validators/blog-validator");
const { catchAsync } = require("../../app/utils/catchAsync");

router.post("/", validate(addBlogSchema), catchAsync(addBlog));

module.exports = router;
