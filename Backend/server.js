'use strict';
require('dotenv').config();
var app = require('./index');
var http = require('http');
var cors = require('cors');
var express = require('express');
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
app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:8100'] }));    // direccion del frontend
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    }
    console.log('Server listening on http://localhost:%d', this.address().port);
});
