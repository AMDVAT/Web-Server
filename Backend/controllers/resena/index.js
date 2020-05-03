module.exports = (router) => {
    router.get('/:id_producto', async (req, res) => {
        try {
            const data = await req.container.resolve('ReviewRepository')
                .resenaDeProducto(req.params);
            const { data: reservas } = data;
            if (data.success && reservas) {
                res.send(reservas);
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