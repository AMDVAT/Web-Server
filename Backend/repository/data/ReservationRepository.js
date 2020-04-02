class ReservationRepository {
    constructor(opts) {
        this.ReservationDataRepository = opts.ReservationDataRepository;
    }

    async crearReserva({ data }) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.ReservationDataRepository.create(data);
            response.message = 'Reserva creada correctamente.';
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al crear una reserva, intente mas tarde.';
        }
        return response;
    }
}

module.exports = ReservationRepository;