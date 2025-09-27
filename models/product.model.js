const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    discountPercentage: Number,
    stock: Number,
    thumnail: String,
    status: String,
    position: Number,
    deleted: Boolean
},{ collection: "products" });
const Product = mongoose.model("Product", productSchema);
module.exports = Product;