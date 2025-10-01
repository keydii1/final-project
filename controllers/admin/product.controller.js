const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/searchHelper");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const paginationHelper = require("../../helpers/panigation");
module.exports.index = async (req, res) => {
    const fillterStatus = fillterStatusHelper(req.query.status);

    let findCondition = {
        deleted: false, // to check not deleted products
    };

    let searchObject = searchHelper(req);
    let keyword = "";
    if(searchObject !== null) {
        findCondition.title = searchObject.regex;
        keyword = searchObject.keyword;
    }
    
    if(req.query.status){
        findCondition.status = req.query.status;
    }
    const countProducts = await Product.countDocuments(Product.find(findCondition));

    let objectPagination = paginationHelper({
        currentPage: 1, limitItems: 2
    }, req,countProducts);
    const products = await Product.find(findCondition).limit(objectPagination.limitItems).skip(objectPagination.skip);

    // console.log(products);
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin Product Page",
        products: products,
        fillterStatus: fillterStatus,
        keyword: keyword,
        pagination: objectPagination
    });
}

module.exports.changeStatus = async(req,res) => {
     const status = req.params.status;
      const id = req.params.id;
      await Product.updateOne({ _id: id } , { status: status});
        const backURL = req.header('Referer') || '/admin/products';
        res.redirect(backURL);



}