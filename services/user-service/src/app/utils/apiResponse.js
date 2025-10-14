exports.successMessage = ({ message = "", data = {} }) => {
    return {
        success: true,
        message,
        data,
    };
};

exports.errorMessage = ({ message = "", data = {} }) => {
    return {
        success: false,
        message,
        data,
    };
};
