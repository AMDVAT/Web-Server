const validarToken = require('../../src/token/validarToken');
const creacionImagenesProducto = require('../../src/manejoImagenes/creacionImagenesProducto');

module.exports = (router) => {
    router.post('/', validarToken, async (req, res) => {
        try {
            const urlImagen = await creacionImagenesProducto(req, res);
            const data = await req.container.resolve('ProductRepository').crearProducto(req.body, { urlImagen });
            const { data: producto } = data;
            let statusCode = 400;
            if (data.success && producto) {
                statusCode = 200;
                if (!urlImagen) {
                    data.message = 'El producto se guardo correctamente, pero la imagen no pudo ser almacenada.';
                }
            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};