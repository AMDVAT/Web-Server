class ReservationRepository {
    constructor(opts) {
        this.ProductDataRepository = opts.ProductDataRepository;
        this.ReservationDataRepository = opts.ReservationDataRepository;
        this.DetailReservationDataRepository = opts.DetailReservationDataRepository;
    }

    async listarReserva(params) {
        const id_usuario = params.idUsuario;
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // console.log('hola',this.ReservationDataRepository);
            // Listado de productos ordenados alfabeticamente
            response.data = await this.ReservationDataRepository.findAll({
                // raw: true,
                // attributes: {
                //     include: [[this.CategoriaDataRepository.sequelize.col('categoria.nombre'), 'nombre_categoria']]
                // },
                include: {
                    model: this.DetailReservationDataRepository,
                    required: true,
                    include: {
                        model: this.ProductDataRepository,
                        required: true,
                        attributes: ['nombre']
                    }
                    // attributes: []
                },
                where: { id_usuario }
                // order: [['nombre', 'ASC']]
            });
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al obtener reservas, intente mas tarde.';
        }
        return response;
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