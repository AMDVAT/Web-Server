module.exports = (id_reserva, element) => {
    return {
        data: {
            cantidad: element.cantidad,
            id_compra: id_reserva,
            id_sucursal: 1,
            id_producto: element.id_producto
        }
    };
};