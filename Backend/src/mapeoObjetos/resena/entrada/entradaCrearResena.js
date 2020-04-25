module.exports = (body) => {
    return {
        data: {
            comentario: body.comentario,
            valoracion: body.valoracion,
            usuario: body.id_usuario,
            producto: body.id_producto,
        }
    };
};