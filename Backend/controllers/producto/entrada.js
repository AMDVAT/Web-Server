module.exports = (router) => {
    router.post('/', async (req, res) => {
        const entradaEntradaProducto = require('../../src/mapeoObjetos/producto/entradaEntradaProducto');
        try {
            const data = await req.container.resolve('ProductEntryRepository').crearEntradaProducto(entradaEntradaProducto(req.body));
            const { data: entradaProducto } = data;
            let statusCode = 400;
            if (data.success && entradaProducto) {
                statusCode = 200;
            }
            res.status(statusCode).send({ mensaje: data.message });
            res.message = data;
        } catch (error) {
            console.log(error)
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};