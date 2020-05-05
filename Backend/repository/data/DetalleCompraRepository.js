class DetalleCompraRepository {
    constructor(opts) {
        this.DetalleCompraDataRepository = opts.DetalleCompraDataRepository;
    }

    async crearDetalleCompra({ data }) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.DetalleCompraDataRepository.create(data);
            response.message = 'Detalle compra creada correctamente.';
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al crear una detalle compra, intente mas tarde.';
        }
        return response;
    }
}

module.exports = DetalleCompraRepository;