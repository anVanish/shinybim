const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const Blogs = new mongoose.Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        contentMD: { type: String, required: true },
        slug: { type: String, unique: true, lowercase: true },
        author: {
            _id: { type: String },
            name: { type: String },
        },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        allowComments: { type: Boolean, default: true },
        status: {
            type: String,
            enum: ["draft, scheduled, published, deleted"],
            default: "draft",
        },
        scheduledAt: { type: Date },
        publishedAt: { type: Date },
        deletedAt: { type: Date },
    },
    { timestamps: true }
);

Blogs.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

Blogs.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update.title) {
        update.slug = slugify(update.title, { lower: true, strict: true });
        this.setUpdate(update);
    }
    next();
});

module.exports = mongoose.model("blogs", Blogs);
