const express = require("express");
const router = express.Router();

const { login, refreshToken } = require("../../app/controllers/authController");

router.post("/login", login);
router.post("/refresh", refreshToken);

module.exports = router;
