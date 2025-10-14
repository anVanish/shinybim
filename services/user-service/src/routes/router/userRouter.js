const express = require("express");
const router = express.Router();

const { profile } = require("../../app/controllers/userController");

router.get("/", profile);

module.exports = router;
