//Los IMPORTS
import {} from 'dotenv/config'
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import fs from 'fs';
import bodyParser from 'body-parser';

import handlebars from 'express-handlebars';

import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';

import { __dirname } from './utils.js';

const PORT = parseInt(process.env.PORT) || 1010;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

/* //LOS PUERTOS
const PUERTO = 1000; //servidor de express 
const WS_PORT = 1010; //servidor Websocket */

//SERVIDOR EXPRESS
const app = express();
const server = http.createServer(app);
/* const httpServer = app.listen(WS_PORT, () => {
    console.log(`Servidor WS activo en puerto ${WS_PORT}`)
}); */
//const io = new Server(httpServer, {cors: {origin: "http://localhost:1010"}});


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false
    }
});


//Eventos socket.io
io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado (${socket.id}) IO`);

    socket.emit('server_confirm', 'Que se vea en el cliente: Conexion recibida');

    

    socket.on("disconnect", (reason) => {
        console.log(`'cliente desconectado (${socket.id}): ${reason}`);
    });

    socket.on('event_cl_01', (data) => {
        console.log('!!!!!!!!!!!!!! APP.JS socket connectado', data);
        socket.emit('confirm', 'APP.JS Conexion de cliente recibida');
    })

    socket.on('product_deleted', async (id) => { // Escuchando 'delete_product' 
    console.log(`Recibiendo peticion para borrar producto ${id}`);
    let products = new ProductManager()

    products.deleteProduct(parseInt(id))
    .then(() => {
        console.log(`Producto con ID ${id} borrado con éxito`);
    })
    .catch((err) => {
        console.log(`Error al borrar producto con ID ${id}: ${err.message}`)
    });
        
    });

    socket.on('product_added', async (product) => {
        console.log (`Recibiendo producto`, product);

        let products = new ProductManager()

        products.addProduct(product)
        .then(() => {
            console.log('Producto agregado con éxito')
        })
        .catch((err) => {
            console.log(`Error al agregar producto`)
        })

        
    });


});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Endpoints API rest
app.use('/api', productsRouter(io));
app.use('/api', cartRouter(io));
app.use(viewsRouter(io));

app.use('/public', express.static(`${__dirname}/public`));

app.listen(PORT, () => {
    console.log(`Servidor base API/Static inicializado en puerto ${PORT}`);
});

//TEMPLATE ENGINE - MOTOR DE PLANTILLAS
app.engine ('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


export default app;
