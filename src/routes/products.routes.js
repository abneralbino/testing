import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import express from 'express';
import bodyParser from 'body-parser';



let products = [];

const productsRouter = (io) => {

  const router = Router();
const productos = new ProductManager();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

  router.get('/products', async (req, res) => {
    const limite = req.query.limite;
    
    try {
      await productos.load();
      const showProducts = await productos.getProducts();
      if (limite) {
        products = products.slice(0, parseInt(limite));
      
      } else {
        res.render('home', {showProducts});
      }   
      console.log("Show products is working?", showProducts);
    } catch (error) {
      res.status(500).send({error: error.message});
    }
    
  });
  
  
  
  router.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
      const product = await productos.getProductById(parseInt(productId));
  
      if (!product) {
        res.status(404).send(`No se encontró ID ${productId}`);
      } else {
        return res.status(200).send(product);
      }
    } catch (error) {
      res.status(500).send({error: error.message});
    }
  }); 
  
  router.post ('/products', async (req, res) =>{
    const newProduct = req.body;
    io.emit('product_added', req.body);
    
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
    
  });
  
  router.put('/products/:pid/:field', async (req, res) => {
  
  const productId = parseInt(req.params.pid);
  const field = req.params.field;
  const updateData = req.body;
  
  
  res.send(await productos.updateProduct(productId, field, updateData));
  console.log(productId);
  console.log(field);
  console.log(updateData);
  
  }); 
  
  router.delete ('/products/:pid', async (req, res) => {
    const deleteById = parseInt(req.params.pid);
    io.emit('product_deleted', req.params.pid);
  
    res.send(await productos.deleteProduct(deleteById));
    console.log(deleteById);
  });

  return router;
  
}

export default productsRouter;

