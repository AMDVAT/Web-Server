const validarToken = require('../../../src/token/validarToken');

module.exports = (router) => {
    router.post('/', validarToken, async (req, res) => {
        try {
            const data = await req.container.resolve('CategoryRepository').crearCategoria(req.body);
            const { data: categoria } = data;
            let statusCode = 400;
            if (data.success && categoria) {
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