module.exports = (router) => {
    router.put('/:id', async (req, res) => {
        try {
            const data = await req.container.resolve('CategoryRepository').editarCategoria(req.body, req.params);
            const { data: categoria } = data;
            let statusCode = 400;
            if (data.success && categoria) { // usuario.email
                statusCode = 200;
            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};