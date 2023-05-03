import http from 'http';
import express from 'express';
import { Router as expressRouter } from 'express';

const viewsRouter = expressRouter();
const appEx = express ();
const httpServer = http.createServer(appEx);


import ProductManager from '../ProductManager.js';
import bodyParser from 'body-parser';

import { Server } from 'socket.io';
import app from '../app.js';
const io = new Server();



const productos = new ProductManager();


viewsRouter.use(bodyParser.urlencoded({ extended: true }));
viewsRouter.use(express.json());

let products = [];


viewsRouter.get('/realtimeproducts', async (req, res) => { //probar con http://localhost:1000/realtimeproducts
    try {
    await productos.load();
    const showProducts = await productos.getProducts();
    res.render('realtimeproducts', {showProducts});
    console.log("realtimeproducts static endpoint is working? YES!" , showProducts);
    } catch (error) {
      res.status(500).send({error: error.message});
    }
  
});


io.on('connection', (socket) => {
  console.log('Usuario conectado: probando DELETE');

  socket.on('delete_product', async (id) => { // Escuchando 'delete_product' 
    const deleteProdIo = await productos.deleteProduct(id); // Delete product por ID usando deleteProduct()
    console.log('WHY AM I NOT SHOWING?! ROUTER');
  });

}); 



/* viewsRouter.delete ('/realtimeproducts/:pid', async (req, res) => {
  const deleteById = parseInt(req.params.pid);

  res.send(await productos.deleteProduct(deleteById));
  console.log(deleteById);
}); */

/* viewsRouter.post ('/realtimeproducts', async (req, res) =>{
  const newProduct = req.body;

  const transport = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    code: req.body.code,
    stock: req.body.stock,
    status: req.body.status,
    category: req.body.category,
  
  }
  
  res.send(await productos.addProduct(transport));
  
}); */


export default viewsRouter;