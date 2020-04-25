module.exports = (router) => {
    router.post('/', async (req, res) => {
        const entradaCrearResena = require('../../src/mapeoObjetos/resena/entrada/entradaCrearResena');
        try {
            const data = await req.container.resolve('ReviewRepository').crearResena(entradaCrearResena(req.body));
            const { data: resena } = data;
            let statusCode = 400;
            if (data.success && resena) {
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