const validarToken = require('../../src/token/validarToken');

module.exports = (router) => {
    router.get('/:id',validarToken, async (req, res) => {
        try {
            const data = await req.container.resolve('UserRepository').buscarUsuarioId(req.params);
            const { data: usuario } = data;
            if (data.success && usuario) {
                res.send(usuario);
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