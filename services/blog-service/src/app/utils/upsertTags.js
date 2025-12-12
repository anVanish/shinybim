const Tags = require("../models/Tags");
const { default: slugify } = require("slugify");

exports.upsertTags = async (tagNames) => {
    const result = [];

    for (const name of tagNames) {
        const slug = slugify(name, { lower: true, strict: true });
        let tag = await Tags.findOne({ slug });

        if (!tag) tag = await Tags.create({ name });

        result.push(tag._id);
    }

    return result;
};
