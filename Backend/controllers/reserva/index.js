const validarToken = require('../../src/token/validarToken');

module.exports = (router) => {
    router.post('/', validarToken, async (req, res) => {
        try {
            //insercion de la reserva
            const entradaCrearReserva = require('../../src/mapeoObjetos/reserva/entrada/entradaCrearReserva');
            const entradaCrearDetalleReserva = require('../../src/mapeoObjetos/reserva/entrada/entradaCrearDetalleReserva');

            const data = await req.container.resolve('ReservRepository').crearReserva(entradaCrearReserva(req));
            const { data: reserva } = data;
            let statusCode = 400;

            if (data.success && reserva) {
                statusCode = 200;

                //despues de hacer la insercion de la reserva insertar en detalle_reserva
                // Cambiar a un for, no usar el for hab
                const id_reserva = reserva.id_reserva;
                req.body.detalle_reserva.forEach(element => {

                    const data_ = await req.container.resolve('DetailReservRepository')
                        .crearDetailReserva(entradaCrearDetalleReserva(id_reserva, element));
                    const { data_: detalle } = data_;

                    if (data_.success && detalle) {
                        statusCode = 200;
                    } else {
                        statusCode = 400;
                        return;
                    }
                });
            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};