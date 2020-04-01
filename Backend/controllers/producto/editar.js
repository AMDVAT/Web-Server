const validarToken = require('../../src/token/validarToken');

module.exports = (router) => {
    router.put('/:id', validarToken,async (req, res) => {
        try {
            const data = await req.container.resolve('ProductRepository').editarProducto(req.body, req.params);
            const { data: producto } = data;
            let statusCode = 400;
            if (data.success && producto) {
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