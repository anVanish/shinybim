exports.validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true, //remove field not in schema
    });
    if (error) return next(error);

    //add validated data to req
    req.validatedBlog = value;
    next();
};
