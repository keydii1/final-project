const Product = require("../../models/product.model");

module.exports.product =  async(req, res) => {
    const products = await Product.find({
        status: "active",// to check active products only
        deleted: false // to check not deleted products
    });
        console.log(products);   
        console.log("here is products page");
        res.render("client/pages/products/index.pug", {
            pageTitle: "Products Page",
            products: products
        });
    }
