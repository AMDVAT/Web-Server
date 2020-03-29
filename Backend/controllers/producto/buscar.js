module.exports = (router) => {
    router.get('/', async (req, res) => {
        try {
            const data = await req.container.resolve('ProductRepository').buscarProducto(req.query);
            const { data: productos } = data;
            if (data.success && productos) {
                res.send(productos);
            }
            else {
                res.status(400).send({ mensaje: data.message });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};