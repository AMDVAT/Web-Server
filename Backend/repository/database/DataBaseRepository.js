const { asValue } = require('awilix');
const { Sequelize } = require('data-layer');

class DataBaseRepository {

    constructor(host, port, database, user, password) {
        this.db = null;
        this.registroModelos = {};
        // Parametros de la conexion
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
    }

    registrarModeloDatos(modelo) {
        this.registroModelos.UserTypeDataRepository = asValue(modelo.tipo_usuario);
        this.registroModelos.UserStatusDataRepository = asValue(modelo.estado_usuario);
        this.registroModelos.UserDataRepository = asValue(modelo.usuario);
        this.registroModelos.ProductDataRepository = asValue(modelo.producto);
        this.registroModelos.CategoriaDataRepository = asValue(modelo.categoria);
        this.registroModelos.StoreDataRepository = asValue(modelo.sucursal);
        this.registroModelos.ReservationDataRepository = asValue(modelo.reserva);
        this.registroModelos.DetailReservationDataRepository = asValue(modelo.detalle_reserva);
        this.registroModelos.SuscriptionDataRepository = asValue(modelo.suscripcion);
        this.registroModelos.SearchDataRepository = asValue(modelo.busqueda);
        this.registroModelos.ReviewDataRepository = asValue(modelo.resena);
        this.registroModelos.ProductEntryDataRepository = asValue(modelo.entrada_producto);
        this.registroModelos.StockDataRepository = asValue(modelo.stock);
        this.registroModelos.CompraDataRepository = asValue(modelo.compra);
        this.registroModelos.DetalleCompraDataRepository = asValue(modelo.detalle_compra);
    }

    crearConexion() {
        this.db = new Sequelize(this.host, this.port, this.database, this.user, this.password);
    }

    async conectarDB() {
        try {
            const _db = await this.db.conectarDB();
            this.registrarModeloDatos(_db.models);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}

module.exports = DataBaseRepository;