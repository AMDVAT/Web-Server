'use strict';

var app = require('./index');
var http = require('http');
var cors = require('cors');
var express = require('express');
var morgan = require('morgan');

var server;

/*
 * Create and start HTTP server.
 */
//settings 
server = http.createServer(app);
server.listen(process.env.PORT || 8000);

//midlewares 
app.use(cors({origin:'http://localhost:4200'}));    // direccion del frontend
app.use(express.json());
app.use(morgan('dev'));


server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});


