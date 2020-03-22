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

    registrarModeloDatos(modelos) {
        this.registroModelos.UserDataRepository = asValue(modelos.usuario);
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