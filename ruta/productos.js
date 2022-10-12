
const express = require('express');
const { Router } = express;
const routerProductos = Router();
const routerProductos = require('./ruta/productos.js');



routerProductos.get('/', (solicitud, respuesta) => {
    respuesta.json(Productos.productos);
});

routerProductos.get('/:id', (solicitud, respuesta) => {
    let prodId = Productos.productos.find(prod => prod.id === Number(solicitud.params.id));
    if (prodId) {
        res.json(prodId);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

routerProductos.post('/', (solicitud, respuesta) => {
    let {nombre, precio, thumbnail} = solicitud.body;
    const nuevoProducto = { nombre, precio, thumbnail };
    nuevoProducto.id = Productos.productos.length + 1;
    Productos.productos.push(nuevoProducto);
    res.json(nuevoProducto);
});

routerProductos.put('/:id', (solicitud, respuesta) => {
    const prodActualizado = solicitud.params;
    productos.push(prodActualizado);
    respuesta.status(201).send('Producto actualizado');
})

routerProductos.delete('/:id', (solicitud, respuesta) => {
    const prods = productos.filter(prod => prod.id != solicitud.params.id)
    respuesta.send({ prods });
})

module.exports = routerProductos;
