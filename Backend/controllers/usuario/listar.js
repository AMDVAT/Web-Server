module.exports = (router) => {
    router.get('/', async (req, res) => {
        try {
            const data = await req.container.resolve('UserRepository').listaUsuarios();
            const { data: usuario } = data;
            if (data.success && usuario) {
                res.send(usuario);
            }
            else {
                res.status(400).send({ mensaje: data.message });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};