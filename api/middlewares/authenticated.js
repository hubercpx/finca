'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_parking';
const CryptoJS = require('crypto-js');
const LocalStorage = require('node-localstorage').LocalStorage;

exports.ensureAuth = function (req, res, next) {
    if(!req.headers['x-key'] && !req.headers['x-signature'] && !req.headers['x-route']) {
        return res.status(403).send({message: 'La peticion no tiene las cabeceras necesarias'});
    } 

    var xkey = req.headers['x-key'].replace(/['"]+/g, '');
    var xsignature = req.headers['x-signature'].replace(/['"]+/g, '');
    var xroute = req.headers['x-route'].replace(/['"]+/g, '');

    var credentials = JSON.parse(localStorage.getItem('credentials'));
    var headers = "[{key:"+xkey+",X-Route:"+xroute+"}]";
    

        var credential = credentials.find(nodo => nodo.key == xkey);

        if(credential) {
            var shared_secret = credential.shared_secret;
            var compare = CryptoJS.HmacSHA256(headers, shared_secret).toString(CryptoJS.enc.Hex);
            next();
        } else {
            return res.status(404).send({message: 'Key No valido'});     
        }

       
    

    

    next();
};