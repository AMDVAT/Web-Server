module.exports = (router) => {
    router.get('/', async (req, res) => {
        try {
            const data = await req.container.resolve('StoreRepository').listarSucursales();
            const { data: categorias } = data;
            if (data.success && categorias) {
                res.send(categorias);
            }
            else {
                res.status(400).send({ mensaje: data.message });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};