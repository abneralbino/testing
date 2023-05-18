import mongoose from "mongoose";

const productosCollection = 'Products';

const productosSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
    
});

const productosModel = mongoose.model(productosCollection, productosSchema);

export default productosModel;
