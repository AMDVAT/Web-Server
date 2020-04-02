class DetailReservationRepository {
    constructor(opts) {
        this.DetailReservationDataRepository = opts.DetailReservationDataRepository;
    }

    async crearDetalleReserva({ data }) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.DetailReservationDataRepository.create(data);
            response.message = 'Detalle reserva creada correctamente.';
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al crear una detalle reserva, intente mas tarde.';
        }
        return response;
    }
}

module.exports = DetailReservationRepository;