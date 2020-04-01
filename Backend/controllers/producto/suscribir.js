module.exports = (router) => {
    router.post('/', async (req, res) => {
        const entradaCrearSuscripcion = require('../../src/mapeoObjetos/suscripcion/entrada/entradaCrearSuscripcion');
        try {
            const data = await req.container.resolve('SuscriptionRepository').crearSuscripcion(entradaCrearSuscripcion(req.body));
            const { data: suscripcion } = data;
            let statusCode = 400;
            if (data.success && suscripcion) {
                statusCode = 200;
            }
            res.status(statusCode).send({ mensaje: data.message });
            res.message = data;
        } catch (error) {
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};