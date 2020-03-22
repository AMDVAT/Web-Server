class UserRepository {
    constructor(opts) {
        this.UserDataRepository = opts.UserDataRepository;
        this.UserTypeDataRepository = opts.UserTypeDataRepository;
        this.UserStatusDataRepository = opts.UserStatusDataRepository;
    }

    async listaUsuarios() {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de usuarios ordenados alfabeticamente
            response.data = await this.UserDataRepository.findAll({
                raw: true,
                attributes: {
                    include: [
                        [this.UserTypeDataRepository.sequelize.col('tipoUsuario.nombre'), 'nombre_tipo_usuario'],
                        [this.UserStatusDataRepository.sequelize.col('estadoUsuario.nombre'), 'nombre_estado_usuario']
                    ]
                },
                include: [{
                    model: this.UserTypeDataRepository,
                    required: true,
                    attributes: []
                }, {
                    model: this.UserStatusDataRepository,
                    required: true,
                    attributes: []
                }],
                order: [['nombre', 'ASC'], ['apellido', 'ASC']]
            });
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener usuarios, intente mas tarde.'
        }
        return response;
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
        const usuario = {
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
            response.data = await this.UserDataRepository.create(usuario);
            response.message = 'Usuario creado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al crear un usuario, intente mas tarde.'
        }
        return response;
    }

    async editarUsuario(body, params) {
        const id_usuario = params.id;
        const usuario = {
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
            response.data = await this.UserDataRepository.update(usuario, { where: { id_usuario } });
            response.message = 'Usuario actualizado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al actualizar un usuario, intente mas tarde.'
        }
        return response;
    }

    async eliminarUsuario(params) {
        const id_usuario = params.id;
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.UserDataRepository.update({ estado: 2 }, { where: { id_usuario } });
            response.message = 'Usuario eliminado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al eliminar el usuario, intente mas tarde.'
        }
        return response;
    }
}

module.exports = UserRepository;