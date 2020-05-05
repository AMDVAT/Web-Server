class ProductEntryRepository {
    constructor(opts) {
        this.UserDataRepository = opts.UserDataRepository;
        this.StockDataRepository = opts.StockDataRepository;
        this.ProductDataRepository = opts.ProductDataRepository;
        this.SuscriptionDataRepository = opts.SuscriptionDataRepository;
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
            const suscripcion = await this.SuscriptionDataRepository.findAll({
                include: [{
                    model: this.UserDataRepository,
                    required: true
                }, {
                    model: this.ProductDataRepository,
                    required: true
                }
                ],
                where: { idProducto: data.idProducto }
            });
            for (let index = 0; index < suscripcion.length; index++) {
                const element = suscripcion[index];
                const mensajeCola = {
                    idUsuario: element.idUsuario,
                    idProducto: element.idProducto,
                    cantidad: data.cantidad,
                    email: element.usuario.email,
                    nombreProducto: element.producto.nombre,
                };
                const amqp = require('amqplib/callback_api');
                amqp.connect('amqp://64.225.24.183:5672', function (error0, connection) {
                    if (error0) {
                        throw error0;
                    }
                    connection.createChannel(function (error1, channel) {
                        if (error1) {
                            throw error1;
                        }

                        var queue = 'amdvat';

                        channel.assertQueue(queue, {
                            durable: true
                        });
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensajeCola)));
                        console.log(' [x] Sent %s', JSON.stringify(mensajeCola));
                    });
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