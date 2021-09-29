'use sctrict'

var bcrypt = require('bcrypt-nodejs');
const { v4: uuidv4 } = require('uuid');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('../uploads');

localStorage.setItem('credentials', '[]');
localStorage.setItem('messages', '[]');


function credential(req, res) {
    // Obtenemos los parametros que vienen en el cuerpo de la request
    var key = req.body.key;
    var shared_secret = req.body.shared_secret;

    if(key != null && shared_secret != null) {
        // Objener objetos de las credenciales como un JSON
        var credentials = JSON.parse(localStorage.getItem('credentials'));  
        
        // Si el nodo es igual a la key que viene en la request
        if(credentials.find(nodo => nodo.key == key)) { 
            var credential = credentials.find(nodo => nodo.key == key);
            res.status(403).send({'credential': credential});  
        } 
        // si la key no esta en el local storage entonces lo crea
        else {   
            var credential = {  'key':key, 
                                'shared_secret':shared_secret
                             };

            credentials.push(credential);            
            localStorage.setItem('credentials',JSON.stringify(credentials));        
            res.status(204).send({message: 'Credencial creada exitosamente'});
        }

        // jsObject = localStorage.getItem('credentials');
        // item = jsObject['key'][key];
        // res.status(403).send({credential: item})
    } else {
        res.status(200).send({message: 'No se esta enviando ningún parametro'});
    }
    
}

function messaqe(req, res) {
    var msg = req.body.msg;
    var tags = req.body.tags;

    if(msg != null && tags != null) {
        //creacion de codigo unico
        var _id = uuidv4();
        var messaqe = {
            '_id': _id,
            'msg': msg,
            'tags': tags
        };

        var messages = JSON.parse(localStorage.getItem('messages'));
        messages.push(messaqe);
        // Si se guardo correctamente
        localStorage.setItem('messages',JSON.stringify(messages));
        res.status(200).send({'_id': _id});
        
    } else {
        res.status(200).send({message: 'No se esta enviando ningún parametro'});
    }

}

function messageId(req, res) {
    var id = req.params.id;
    var messages = JSON.parse(localStorage.getItem('messages'));  
        
    // Si el nodo es igual al id que viene en la request
    if(messages.find(nodo => nodo._id == id)) { 
        var message = messages.find(nodo => nodo._id == id);
        res.status(200).send({'message': message.msg});  
    } 
    // si el id no esta en el local storage entonces da un mensaje 404
    else {   
        res.status(404).send({message: 'El mensaje no existe'});
    }
}

function messageIdCompleto(req, res) {
    var id = req.params.id;
    var messages = JSON.parse(localStorage.getItem('messages'));  
        
    // Si el nodo es igual al id que viene en la request
    if(messages.find(nodo => nodo._id == id)) { 
        var message = messages.find(nodo => nodo._id == id);
        res.status(200).send({'message': message});  
    } 
    // si el id no esta en el local storage entonces da un mensaje 404
    else {   
        res.status(404).send({message: 'El mensaje no existe'});
    }
}



function messagestag(req, res) {
    var tag = req.params.tags;
    var messages = JSON.parse(localStorage.getItem('messages'));

    // Si el nodo es igual al tag que viene en la request
    if(messages.filter(nodo => nodo.tags == tag)) { 
        var messages_tags = messages.filter(nodo => nodo.tags == tag);
        res.status(200).send({'message': messages_tags});  
    } 
    // si el tag no esta en el local storage entonces da un mensaje 404
    else {   
        res.status(404).send({message: 'No existen mensajes con el tag ' + tag });
    }
}

module.exports = {
    credential,
    messaqe,
    messageId,
    messageIdCompleto,
    messagestag
};