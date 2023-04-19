const express = require('express');
const router = express.Router();
const cartManager = require ('../CartManager.js');
let bodyParser = require('body-parser')

const newCarts = new cartManager();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

const carts = [];

router.get('/carts', (req,res) => {
    res.status(200).send('CARTS INICIADO');
});

router.post('/carts', async (req,res) => {
    const newCart = req.body;

    const cartTransport = {
        cratId: '',
        products: []
    }

    res.send(await newCarts.addCart(newCart));
});

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params;
    try {
        await newCarts.load();
        let getCart = await newCarts.getCartById(parseInt(cartId.cid)); 

    res.status(200).send(getCart)
    } catch (error) {
        res.status(500).send({error: error.message});
    }

    console.log(cartId.cid);
});

router.post('/carts/:cid/product/:pid', async (req, res) =>{
    const cartId = parseInt(req.params.cid);
    const cartProductId = parseInt(req.params.pid);
    const cartProductQuantity = req.body.quantity

    try {
        await newCarts.load();
        let updateCartCid = await newCarts.addProductToCart(cartId, cartProductId, cartProductQuantity);
        
        res.status(200).send(updateCartCid);
    } catch (error) {
        res.status(500).send({error: error.message});
    }

    console.log(cartId);
    console.log(cartProductId);
    console.log(cartProductQuantity);
})
module.exports = router;