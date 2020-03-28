module.exports = (router) => {
    router.post('/', async (req, res) => {
        try {
            const data = await req.container.resolve('UserRepository').crearUsuario(req.body);
            const { data: usuario } = data;
            let statusCode = 400;
            if (data.success && usuario) {
                statusCode = 200;
            }
            res.status(statusCode).send({ mensaje: data.message });
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};