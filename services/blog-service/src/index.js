const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { route } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const { notfoundHandler } = require("./middlewares/notfoundHandler");
const mongodb = require("./config/mongo");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
mongodb.connect();

//middlewares
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
route(app);

app.use(notfoundHandler);
app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`Service started at port ${PORT}, http://localhost:${PORT}/api`)
);
