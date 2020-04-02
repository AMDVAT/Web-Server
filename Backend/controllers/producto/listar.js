module.exports = (router) => {
    router.get('/', async (req, res) => {
        try {
            const data = await req.container.resolve('ProductRepository').listarProductos();
            const { data: productos } = data;
            if (data.success && productos) {
                res.send(productos);
            }
            else {
                res.status(400).send({ mensaje: data.message });
            }
            res.message = data;
        } catch (error) {
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });

    router.get('/masBuscados', async (req, res) => {
        try {
            const data = await req.container.resolve('SearchRepository').listarProductosMasBuscados();
            const { data: productos } = data;
            if (data.success && productos) {
                res.send(productos);
            }
            else {
                res.status(400).send({ mensaje: data.message });
            }
            res.message = data;
        } catch (error) {
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};