class ProductEntryRepository {
    constructor(opts) {
        this.StockDataRepository = opts.StockDataRepository;
        this.ProductDataRepository = opts.ProductDataRepository;
        this.ProductEntryDataRepository = opts.ProductEntryDataRepository;
    }

    async crearEntradaProducto({ data }) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.ProductEntryDataRepository.create(data);
            const actualData = await this.StockDataRepository.findOne({
                where: { idSucursal: 1, idProducto: data.idProducto }
            });
            if (actualData) {
                this.StockDataRepository.update({
                    idSucursal: 1
                    , idProducto: data.idProducto
                    , cantidad: actualData.cantidad + data.cantidad
                }, {
                    where: { idSucursal: 1, idProducto: data.idProducto }
                });
            }
            else {
                this.StockDataRepository.create({
                    idSucursal: 1
                    , idProducto: data.idProducto
                    , cantidad: data.cantidad
                });
            }
            response.message = 'Entrada producto creado correctamente.';
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al crear una entrada de producto, intente mas tarde.';
        }
        return response;
    }
}

module.exports = ProductEntryRepository;