exports.safeUser = (user) => {
    if (!user) return {};
    const { _id, name, email, avatarUrl, isAdmin, createdAt } = user;
    return { _id, name, email, avatarUrl, isAdmin, createdAt };
};

exports.safeUpdateUser = (user) => {
    if (!user) return {};
    const { name, avatarUrl } = user;
    return { name, avatarUrl };
};
