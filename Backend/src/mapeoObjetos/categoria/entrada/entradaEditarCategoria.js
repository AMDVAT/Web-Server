module.exports = (body, params) => {
    return {
        params: {
            id_categoria: params.id_categoria
        },
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria_id_categoria: body.categoria_id_categoria
        }
    };
};