const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const Categories = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
        slug: { type: String, unique: true, lowercase: true },
    },
    { timestamps: true }
);

Categories.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

Categories.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update.name) {
        update.slug = slugify(update.name, { lower: true, strict: true });
    }
    next();
});

Categories.index({ parentId: 1 });

module.exports = mongoose.model("categories", Categories);
