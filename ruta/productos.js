
const express = require('express');
const { Router } = express;
const routerProductos = Router();

const productos = [];

routerProductos.get('/', (solicitud, respuesta) => {
    respuesta.send({ productos });
})

routerProductos.get('/:id', (solicitud, respuesta) => {
    const prodId = productos.filter(prod => prod.id == solicitud.params.id)
    respuesta.send({ prodId });
})

routerProductos.post('/', (solicitud, respuesta) => {
    const {nombre, precio, id} = solicitud.body;
    productos.push({nombre, precio, id});
    respuesta.json({ok: true});
})

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


// otras aternativas de la 1

routerProductos.delete('/:id', (solicitud, respuesta) => {
    const prod = productos.filter(prod => prod.id != solicitud.params.id)
    respuesta.status(200).send('Producto eliminado');
})

routerProductos.post('/', (solicitud, respuesta) => {
    const producto = solicitud.body;
    productos.push(producto);
    respuesta.status(201).send('Producto agregado');
})



// alternativas 2

routerProductos.get('/', async (solicitud, respuesta) => {
    const mostrarTodos = await productosArchivo.obtenerTodos();
    res.json(mostrarTodos);
})

routerProductos.get('/:id', async (solicitud, respuesta) => {
    const id = solicitud.params.id;
    const productoXid = await productosArchivo.obtenerXid(id);
    res.json(productoXid);
})

routerProductos.post('/', async (solicitud, respuesta) => {
    const producto = solicitud.body
    const productoCreado = await productosArchivo.guardar(producto);
    res.json(productoCreado);
})

routerProductos.put('/:id', async (solicitud, respuesta) => {
    const id = solicitud.params.id;
    const producto = solicitud.body;
    const productoActualizado = await productosArchivo.actualizar(id, producto);
    res.json(productoActualizado);
})

routerProductos.delete('/:id', async (solicitud, respuesta) => {
    const id = solicitud.params.id;
    await productosArchivo.borrarXid(id);
    res.send('producto eliminado');
})

