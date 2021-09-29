'use strict'

var app = require('./app');
var port = process.env.PORT || 3977;
   
app.listen(port, (err, res) => {
    if(err) {
        throw err;
    } else {
    console.log("Servidor del api rest de parking escuchando en http://localhost:" + port);
    }
});