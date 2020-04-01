const validarToken = require('../../src/token/validarToken');
const creacionImagenesProducto = require('../../src/manejoImagenes/creacionImagenesProducto');

module.exports = (router) => {
    router.post('/', validarToken, async (req, res) => {
        try {
            let mensajeRegistro = null;
            const urlImagen = await creacionImagenesProducto(req, res);
            const data = await req.container.resolve('ProductRepository').crearProducto(req.body, { urlImagen });
            if (urlImagen) mensajeRegistro = 'El producto se guardo correctamente, pero la imagen no pudo ser almacenada.';
            const { data: producto } = data;
            let statusCode = 400;
            if (data.success && producto) {
                statusCode = 200;
                if (!urlImagen) {
                    data.message = mensajeRegistro;
                }
            }
            res.status(statusCode).send({ mensaje: data.message });
            res.message = data;
        } catch (error) {
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};