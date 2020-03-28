const consultarToken = require('../../src/token/consultarToken');

module.exports = (router) => {
    router.post('/', async (req, res) => {
        const cabecera = req.headers['token'];
        const id = consultarToken({
            cabecera: cabecera
        });

        try {

            //objeto reserva 
            let now= new Date();
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

            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};