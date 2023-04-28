//Los IMPORTS
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import handlebars from 'express-handlebars';
import Engine from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import router from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';


//LOS PUERTOS
const PUERTO = 1000; //servidor de express 
const WS_PORT = 1010; //servidor Websocket

//SERVIDOR EXPRESS
const app = express();
const httpServer = app.listen(WS_PORT, () => {
    console.log(`Servidor WS activo en puerto ${WS_PORT}`)
});
const wss = new Server(httpServer, {cors: { origin: "http://localhost1010"}});

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

const server = http.createServer(app);

//TEMPLATE ENGINE - MOTOR DE PLANTILLAS
app.engine ('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.set('views', './views');


//CONTENIDOS ESTÁTICOS
app.use(express.static('views')); //cambiarlo a public para acceder a index.html

//Endpoints API rest
app.use('/api', router);
app.use('/api', cartRouter);
app.use(viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor base API/Static inicializado en puerto ${PUERTO}`);
});


//Eventos socket.io
wss.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado (${socket.id})`);

    socket.emit('server_confirm', 'Que se vea en el cliente: Conexion recibida');

    socket.on("disconect", (reason) => {
        console.log(`'cliente desconectado (${socket.id}): ${reason}`);
    });

    socket.on('event_cl_01', (data) => {
        console.log('!!!!!!!!!!!!!! APP.JS socket connectado', data);
        socket.emit('confirm', 'APP.JS Conexion de cliente recibida');
    })
});



export default app;
//
/*PARA PROBAR

{
    "title": "pants",
    "description": "panties",
    "price": 50000,
    "thumbnail": "paaants",
    "code": "pant123",
    "stock": 2,
    "status": true,
    "category": "pants"
}*/

/*,{
    "title": "shirt",
    "description": "shirt",
    "price": 500,
    "thumbnail": "cool shirt",
    "code": "shir123",
    "stock": 10,
    "status": true,
    "category": "shirts"
},{
    "title": "socks",
    "description": "socks that sucks",
    "price": 50,
    "thumbnail": "soooocks",
    "code": "SO123",
    "stock": 30,
    "status": true,
    "category": "underwear"
}*/