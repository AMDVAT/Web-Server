'use strict';
require('dotenv').config();
var app = require('./index');
var http = require('http');
var cors = require('cors');
var express = require('express');
var morgan = require('morgan');
var { Sequelize } = require('data-layer');
let db = 10;
var server;
const DB = new Sequelize(process.env.DB_HOST
    , process.env.DB_PORT
    , process.env.DB_NAME
    , process.env.DB_USER
    , process.env.DB_PASS);
/*
 * Create and start HTTP server.
 */
//settings 
server = http.createServer(app);
server.listen(process.env.PORT || 8000);

//midlewares 
app.use(cors({ origin: 'http://localhost:4200' }));    // direccion del frontend
app.use(express.json());
app.use(morgan('dev'));
// database integration inside modules.
const dbx = function (req, _, next) { req.db = db; next(); };
app.use(dbx.bind(db));

DB.conectarDB()
    .then((_db) => {
        db = _db;
        server.on('listening', function () {
            console.log('Server listening on http://localhost:%d', this.address().port);
        });
    })
    .catch((e) => console.error('El sistema no se pudo conectar a la DB.', e));


