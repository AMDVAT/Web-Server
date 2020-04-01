module.exports = (body) => {
    return {
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria_id_categoria: body.categoria_id_categoria
        }
    };
};