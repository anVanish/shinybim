const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

//middlewares
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", function (req, res) {
    res.send("Hello world from comment service");
});

app.listen(PORT, () =>
    console.log(`Service started at port ${PORT}, http://localhost:${PORT}`)
);
