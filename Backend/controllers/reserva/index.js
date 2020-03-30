const consultarToken = require('../../src/token/consultarToken');

module.exports = (router) => {
    router.post('/', async (req, res) => {
        const token = req.headers['token'];
        const id = consultarToken({
            token: token
        });

        try {

            //objeto reserva 
            let now = new Date();
            const reserva = {
                fecha: now,
                estado: 3, //estado 'pendiente'
                id_usuario: id
            }
            //insercion de la reserva 
            const data = await req.container.resolve('ReservRepository').crearReserva(reserva);
            const { data: reserva } = data;
            let statusCode = 400;

            if (data.success && reserva) {
                statusCode = 200;
                //despues de hacer la insercion de la reserva insertar en detalle_reserva
                const id_reserva = data.id_reserva;
                req.body.detalle_reserva.forEach(element => {
                    const detalle = {
                        cantidad: element.cantidad,
                        id_reserva: id_reserva,
                        id_sucursal: element.id_sucursal,
                        id_producto: element.id_producto
                    }
                    const data_ = await req.container.resolve('DetailReservRepository').crearReserva(detalle);
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