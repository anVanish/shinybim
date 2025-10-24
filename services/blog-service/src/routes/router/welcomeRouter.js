const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Hello from blog-service");
});

module.exports = router;
