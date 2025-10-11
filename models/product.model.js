const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    product_category_id: {
        type: String,
        default: ""
    },
    createBy: {
        account_id: String,
        createdAt: {
            type: String,
            default: Date.now()
        }
    },
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