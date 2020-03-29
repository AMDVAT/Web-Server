const validarToken = require('../../src/token/validarToken');

module.exports = (router) => {
    router.delete('/:id',validarToken, async (req, res) => {
        try {
            const data = await req.container.resolve('ProductRepository').eliminarProducto(req.params);
            const { data: producto } = data;
            let statusCode = 400;
            if (data.success && producto) {
                statusCode = 200;
            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};