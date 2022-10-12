
const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

app.use(express.json());


const routerProductos = require('./ruta/productos.js');

app.use('/api/productos', routerProductos);



app.use('/formProd', express.static(__dirname+'/public/index.html'));
console.log( '1) link formulario: http://localhost:8080/formProd')
