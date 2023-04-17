const fs = require('fs');
const express = require('express');
const PUERTO = 1000;
const app = express();
app.use(express.urlencoded({extended:true}));

class ProductManager {
    constructor () {
        this.products = [];
        this.latestId = 1;
        this.path = '../src/listadoDeProductos.JSON';
    } //./listadoDeProductos.JSON

    async load() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            console.log('Data loaded successfully');
        } catch (error) {
            console.log(error);
            throw new Error('Error loading data');
        }
    }

    async addProduct (title, description, price, thumbnail, code, stock, status, category) {
        if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            console.log("Error: todos los campos son obligatorios");
            return; 
        }  else {
            const found = this.products.some(product => product.code === code);
        if (found) {
            console.log(`Error: Ya existe un producto con el código ${code}`);
            return;
        }

    const newproduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: true, 
        category: category,
        id: ++ this.latestId 
    }

    this.products.push (newproduct);
    console.log("Producto agregado con éxito");
        fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
            if (err) throw err;
            console.log('Archivo guardado con éxito');
            return;
        });
        
    }
        }

    

    async getProducts() {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products);
            return this.products;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getProductById(productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId);
        if (product) {
            console.log(product);
            return product; // Return the product object, not just the ID
        } else {
            console.log("Error: producto no encontrado");
        }
    } 

    async updateProduct (productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index][field] = updateData;

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
    }

    async deleteProduct (deleteById){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);

        const deleteItemFilter = products.filter(product => product.id !== deleteById);

        if (deleteItemFilter.length === products.length) {
            console.log(`Error: No se encontró producto con ID ${deleteById}`);
            return;
        }

        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), err => {
            if (err) throw err;
            console.log('Producto borrado con éxito desde deleteProduct');
        });
        
    }

}

module.exports = ProductManager;

