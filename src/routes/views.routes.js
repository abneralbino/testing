import express from 'express';
import { Router as expressRouter } from 'express';
const viewsRouter = expressRouter();
import ProductManager from '../ProductManager.js';
import bodyParser from 'body-parser';


const productos = new ProductManager();


viewsRouter.use(bodyParser.urlencoded({ extended: true }));
viewsRouter.use(express.json());

let products = [];


viewsRouter.get('/realtimeproducts', async (req, res) => { //probar con http://localhost:1000/realtimeproducts
    try {
    await productos.load();
    const showProducts = await productos.getProducts();
    res.render('realtimeproducts', {showProducts});
        
      console.log("realtime is working? YES!" , showProducts);
    } catch (error) {
      res.status(500).send({error: error.message});
    }
  
});

export default viewsRouter;