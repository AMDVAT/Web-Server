class ComprasRepository {
    constructor(opts) {
        this.CompraDataRepository = opts.CompraDataRepository;
    }

    async crearComprar({ data }) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.CompraDataRepository.create(data);
            response.message = 'Compra creada correctamente.';
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al crear una reserva, intente mas tarde.';
        }
        return response;
    }
}

module.exports = ComprasRepository;