
// Requires e Imports
const express = require('express');
const routerProductos = require('./ruta/productos.js');
const app = express();

//Puerto
const PORT = process.env.PORT || 8080;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Rutas
app.use('/api/productos', routerProductos);


// Servidor
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${server.address().port}`));
server.on('error', err => console.log(`Error: ${err}`));