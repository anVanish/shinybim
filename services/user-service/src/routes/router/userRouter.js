const express = require("express");
const router = express.Router();

const {
    profile,
    updateProfile,
} = require("../../app/controllers/userController");

router.get("/me", profile);
router.put("/me", updateProfile);

module.exports = router;
