'use strict';
require('dotenv').config();
var app = require('./index');
var http = require('http');
var cors = require('cors');
var morgan = require('morgan');
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
