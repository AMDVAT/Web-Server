'use strict';
require('dotenv').config();
var app = require('./index');
var http = require('http');
var cors = require('cors');
var morgan = require('morgan');
const tipoEvento = require('./src/constantes/tipoEvento');
const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');
const bodyParser = require('body-parser');
const container = require('./repository/container/registroServicios');
const DataBaseRepository = require('./repository/database/DataBaseRepository');
var server;
/*
 * Create and start HTTP server.
 */
//settings 
server = http.createServer(app);
server.listen(process.env.PORT || 8000);

//midlewares 
app.use(cors());    // direccion del frontend
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
// database integration inside modules.
const dbx = function (req, _, next) { req.container = container; next(); };
app.use(dbx.bind(container));
// Logger
winston.add(new Loggly({
    token: process.env.LOGTOKEN,
    subdomain: process.env.LOGSUBDOMAIN,
    tags: ['Winston-NodeJS', 'AMDVAT'],
    json: true,
}));

/**
 * @summary Determina el tipo de alerta basandose en el codigo http.
 * @function
 * @private
 *
 * @param {Number} code - codigo http de la petición
 * @returns {String} el tipo de alerta
 */
function levelName(code) {
    if ((code >= 200) && (code < 300)) {
        return tipoEvento.info;
    }
    if ((code >= 300) && (code < 400)) {
        return tipoEvento.warn;
    }
    return tipoEvento.error;
}

/**
 * @summary Sincroniza el registro con la bitacora.
 * @function
 * @private
 *
 * @param {Object} syslog - informacion de la peticíon
 */
function sendLog(eventType, syslog) {
    winston.log(eventType, syslog);
}

// Logs
app.use((req, res, next) => {
    res.on('finish', () => {
        const syslog = {
            endpoint: req.baseUrl,
            method: req.method,
            statusCode: res.statusCode,
            remoteAddress: req.connection.remoteAddress,
            message: res.message,
            input: {
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers
            },
        };
        sendLog(levelName(syslog.statusCode), syslog);
    });
    next();
});

server.on('listening', async function () {
    try {
        const db = new DataBaseRepository(process.env.DB_HOST
            , process.env.DB_PORT
            , process.env.DB_NAME
            , process.env.DB_USER
            , process.env.DB_PASS);
        db.crearConexion();
        await db.conectarDB();
        container.register(db.registroModelos);
    } catch (error) {
        console.error(error);
        process.exit();
    }
    console.log('Server listening on http://localhost:%d', this.address().port);
});
