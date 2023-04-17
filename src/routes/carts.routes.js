const express = require('express');

const router = express.Router();

const carts = [];

router.get('/carts', (req,res) => {
    res.status(200).send('CARTS INICIADO');
});

module.exports = router;