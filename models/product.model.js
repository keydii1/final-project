const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    discountPercentage: Number,
    stock: Number,
    thumnail: String,
    status: String,
    position: Number,
    slug: {
        type: String, 
        slug: "title",
        unique: true
     },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
}

,{ collection: "products" });
const Product = mongoose.model("Product", productSchema);
module.exports = Product;