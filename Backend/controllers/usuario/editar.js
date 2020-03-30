const validarToken = require('../../src/token/validarToken');

module.exports = (router) => {
    router.put('/:id', validarToken, async (req, res) => {
        try {
            const entradaEditarUsuario = require('../../src/mapeoObjetos/usuario/entrada/entradaEditarUsuario');
            const data = await req.container.resolve('UserRepository')
                .editarUsuario(entradaEditarUsuario(req.body, req.params));
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