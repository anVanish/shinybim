const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const Tags = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true, lowercase: true },
    },
    { timestamps: true }
);

Tags.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

Tags.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update.name) {
        update.slug = slugify(update.name, { lower: true, strict: true });
        this.setUpdate(update);
    }
    next();
});

module.exports = mongoose.model("tags", Tags);
