class DetalleCompraRepository {
    constructor(opts) {
        this.StockDataRepository = opts.StockDataRepository;
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
            const actualData = await this.StockDataRepository.findOne({
                where: { idSucursal: 1, idProducto: data.id_producto }
            });
            if (actualData) {
                this.StockDataRepository.update({
                    idSucursal: 1
                    , idProducto: data.id_producto
                    , cantidad: actualData.cantidad - data.cantidad
                }, {
                    where: { idSucursal: 1, idProducto: data.id_producto }
                });
            }
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