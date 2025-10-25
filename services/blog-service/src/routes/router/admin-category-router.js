const express = require("express");
const router = express.Router();
const {
    addCategory,
} = require("../../app/controllers/admin-category-controller");

router.post("/", addCategory);

module.exports = router;
