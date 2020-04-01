const validarToken = require('../../src/token/validarToken');

module.exports = (router) => {
    router.get('/:email',validarToken, async (req, res) => {
        try {
            const data = await req.container.resolve('UserRepository').buscarUsuarioEmail(req.params);
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