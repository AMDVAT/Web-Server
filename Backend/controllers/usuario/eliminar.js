module.exports = (router) => {
    router.delete('/:id', async (req, res) => {
        try {
            const data = await req.container.resolve('UserRepository').eliminarUsuario(req.params);
            const { data: usuario } = data;
            let statusCode = 400;
            if (data.success && usuario) { // usuario.email
                statusCode = 200;
            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};