'use strict'

var express = require('express');
var md_auth = require('../middlewares/authenticated');
var MainController = require('../controllers/MainController');

var api = express.Router();

// api.post('/login', UserController.login);
api.put('/credential', MainController.credential);
api.post('/messaqe', md_auth.ensureAuth, MainController.messaqe);
api.get('/message/:id', md_auth.ensureAuth, MainController.messageId);
api.get('/messages/:tags', md_auth.ensureAuth, MainController.messagestag);
// api.post('/user/registrar/administrador',md_auth.ensureAuth, UserController.registrarAdministrador);
// api.post('/user/registrar/usuario', md_auth.ensureAuth, UserController.registrarUsuario);
// api.put('/user/update/:id', md_auth.ensureAuth, UserController.updateUsuario);
// api.put('/user/upload-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage)
// api.get('/user/get-image/:imageFile', UserController.getImageFile);
// api.get('/user/get/:id', UserController.getUsuario)
// api.get('/user/list/:page?', UserController.listUsuarios);
// api.delete('user/delete/:id', md_auth.ensureAuth, UserController.deleteUser);



module.exports = api;