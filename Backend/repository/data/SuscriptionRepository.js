class SuscriptionRepository {
    constructor(opts) {
        this.SuscriptionDataRepository = opts.SuscriptionDataRepository;
    }

    async crearSuscripcion({ data }) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.SuscriptionDataRepository.create(data);
            response.message = 'Suscripcion creada correctamente.';
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al crear una suscripcion, intente mas tarde.';
        }
        return response;
    }
}

module.exports = SuscriptionRepository;