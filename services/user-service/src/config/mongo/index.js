const mongoose = require("mongoose");

async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected!");
    } catch (error) {
        console.log("Error connect database!");
    }
}

module.exports = { connect };
