const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Tokens = new mongoose.Schema(
    {
        userId: { type: ObjectId, required: true, ref: "users" },
        token: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("tokens", Tokens);
