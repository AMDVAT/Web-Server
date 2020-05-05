module.exports = (body) => {
    return {
        data: {
            fecha: new Date(),
            cantidad: body.cantidad,
            precio_unitario: body.precio_unitario,
            idProveedor: 1,
            idProducto: body.idProducto,
        }
    };
};