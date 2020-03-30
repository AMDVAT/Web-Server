module.exports = (body) => {
    return {
        data: {
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            password: body.password,
            tipo_usuario: body.tipo_usuario,
        }
    };
};