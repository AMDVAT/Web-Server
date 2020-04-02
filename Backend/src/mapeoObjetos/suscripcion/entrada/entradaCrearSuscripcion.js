module.exports = (req) => {
    let now = new Date();
    return {
        data: {
            idUsuario: req.tokenData.idUsuario,
            idProducto: req.body.id_producto,
            id_estado: 1, //estado: 'pendiente'
            fecha: now
        }
    };
};