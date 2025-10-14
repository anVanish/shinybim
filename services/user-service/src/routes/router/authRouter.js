const express = require("express");
const router = express.Router();

const { login } = require("../../app/controllers/authController");

router.post("/login", login);

module.exports = router;
