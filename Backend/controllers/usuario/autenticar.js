const generarToken = require('../../src/token/generarToken');

module.exports = (router) => {

    router.post('/', async (req, res) => {
        const entradaInicioSesionUsuario = require('../../src/mapeoObjetos/usuario/entrada/entradaInicioSesionUsuario');
        try {
            const data = await req.container.resolve('UserRepository')
                .inicioSesion(entradaInicioSesionUsuario(req.body));
            const { data: usuario } = data;
            if (data.success && usuario) {
                let mensaje = null;
                if (usuario.tipo_usuario == 1) {
                    mensaje = 'administrador';
                } else {
                    mensaje = 'usuario';
                }
                const token = generarToken({
                    idUsuario: usuario.id_usuario
                    , email: usuario.email
                    , tipoUsuario: usuario.tipo_usuario
                });
                res.send({
                    token: token,
                    mensaje: mensaje
                });
            }
            else {
                res.status(401).send({ mensaje: 'Credenciales incorrectas' });
            }
            res.message = data;
        } catch (error) {
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo obtener los datos.' });
        }
    });
};