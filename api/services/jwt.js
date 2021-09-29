'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_parking';

exports.createToken = function(user) {
    var payload = {
        sub: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        nick: user.nick,
        email: user.email,
        role: user.role.nombre,
        parqueo: user.parqueo,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix() 
    };

    return jwt.encode(payload, secret);
}