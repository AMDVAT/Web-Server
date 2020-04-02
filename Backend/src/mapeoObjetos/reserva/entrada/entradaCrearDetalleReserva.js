module.exports = (id_reserva, element) => {
    return {
        data: {
            cantidad: element.cantidad,
            idReserva: id_reserva,
            idSucursal: element.id_sucursal,
            idProducto: element.id_producto
        }
    };
};