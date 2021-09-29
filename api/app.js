'use strict'

var express = require('express');
const bodyParser = require('body-parser');
var app = express();

// cargar rutas
var routes = require('./routes/api');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras http
app.use((rea, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','X-Key', 'X-Route', 'X-Signature', 'Authorization,  X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas base
app.use('/api', routes);


module.exports = app;