const Product = require("../../models/product.model");


module.exports.product = async (req, res) => {
    const products = await Product.find({
        deleted: false, // to check not deleted products
        status: "active" // to check active products only
    });
    console.log(products);
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin Product Page",
        products: products
    });
}
