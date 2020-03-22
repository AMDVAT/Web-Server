class UserRepository {
    constructor(opts) {
        this.UserDataRepository = opts.UserDataRepository;
    }

    async inicioSesion(email, contrasena) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            const data = await this.UserDataRepository
                .findOne({ where: { email: email || null, password: contrasena || null } });
            response.data = data.dataValues;
        } catch (error) {
            response.success = false;
            response.message = 'Error al realizar la autenticacion, intente mas tarde.'
        }
        return response;
    }
}

module.exports = UserRepository;