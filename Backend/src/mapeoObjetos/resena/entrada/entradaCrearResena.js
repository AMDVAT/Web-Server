module.exports = (body) => {
    return {
        data: {
            comentario: body.comentario,
            valoracion: body.valoracion,
            id_usuario: body.usuario,
            id_producto: body.producto,
        }
    };
};