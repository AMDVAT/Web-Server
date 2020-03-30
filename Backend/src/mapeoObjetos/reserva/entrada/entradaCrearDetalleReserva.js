module.exports = (id_reserva,element) => {
    return {
        data: {
            cantidad: element.cantidad,
            id_reserva: id_reserva,
            id_sucursal: element.id_sucursal,
            id_producto: element.id_producto
        }
    };
};