const express = require("express");
const router = express.Router();
const {
    getCategoriesList,
} = require("../../app/controllers/category-controller");

router.get("/", getCategoriesList);

module.exports = router;
