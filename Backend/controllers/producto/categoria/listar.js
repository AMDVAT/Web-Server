module.exports = (router) => {
    router.get('/', async (req, res) => {
        try {
            const data = await req.container.resolve('CategoryRepository').listarCategorias();
            const { data: categorias } = data;
            if (data.success && categorias) {
                res.send(categorias);
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

    router.get('/padre', async (req, res) => {
        try {
            const data = await req.container.resolve('CategoryRepository').listarCategorias(true);
            const { data: categorias } = data;
            if (data.success && categorias) {
                res.send(categorias);
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