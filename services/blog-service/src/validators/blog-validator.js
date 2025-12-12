const joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

exports.addBlogSchema = joi.object({
    title: joi.string().min(3).max(200).required(),
    summary: joi.string().min(10).max(500).required(),
    contentMD: joi.string().min(20).required(),
    author: joi
        .object({
            _id: joi.string().required(),
            name: joi.string().required(),
        })
        .required(),
    categoryId: joi.string().custom(objectId).required(),
    tagNames: joi.array().items(joi.string()),
    allowComments: joi.boolean().default(true),
    status: joi
        .string()
        .valid("draft", "scheduled", "published")
        .default("draft"),

    //this field required only when status is scheduled
    scheduledAt: joi.date().when("status", {
        is: "scheduled",
        then: joi.date().required(),
        otherwise: joi.date().optional(),
    }),
});
