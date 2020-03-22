class UserRepository {
    constructor(opts) {
        this.UserDataRepository = opts.UserDataRepository;
    }

    async inicioSesion(body) {
        const { email, contrasena } = body;
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.UserDataRepository
                .findOne({ where: { email: email || null, password: contrasena || null } });
        } catch (error) {
            response.success = false;
            response.message = 'Error al realizar la autenticacion, intente mas tarde.'
        }
        return response;
    }

    async crearUsuario(body) {
        const User = {
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            password: body.contrasena,
            tipo_usuario: body.tipo_usuario,
            estado: 1,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.UserDataRepository.create(User);
            response.message = 'Usuario creado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al crear un usuario, intente mas tarde.'
        }
        return response;
    }
}

module.exports = UserRepository;