module.exports = (body) => {
    return {
        data: {
            email: body.email || null,
            password: body.contrasena || null,
        }
    };
};