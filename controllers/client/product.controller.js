const Product = require("../../models/product.model");

module.exports.product =  async(req, res) => {
    const products = await Product.find({
        status: "active",// to check active products only
        deleted: false // to check not deleted products
    })
        .sort({position: "asc"});
        console.log(products);   
        console.log("here is products page");
        res.render("client/pages/products/index.pug", {
            pageTitle: "Products Page",
            products: products
        });
}
module.exports.productDetail = async(req, res) => {
    const slug = req.params.slug;
    const findCondition= {
        slug: slug,
        deleted: false,
        status: "active"
    }
    const product = await Product.findOne(findCondition);
    res.render("client/pages/products/detail.pug", {
        pageTitle:`${product.title} Detail Page`,
        product: product
    });
}