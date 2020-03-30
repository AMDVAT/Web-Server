module.exports = (body, params) => {
    return {
        params: {
            id_usuario: params.id
        },
        data: {
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            password: body.password,
            tipo_usuario: body.tipo_usuario,
            estado: body.estado,
        }
    };
};