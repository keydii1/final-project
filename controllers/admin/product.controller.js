const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/searchHelper");
const fillterStatusHelper = require("../../helpers/fillterStatus");
module.exports.product = async (req, res) => {
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
    let objectPagination = {
        currentPage: 1,
        limitItems: 2
    }
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    const countProducts = await Product.countDocuments(Product.find(findCondition));
    const totalPages = Math.ceil(countProducts / objectPagination.limitItems);
    objectPagination.totalPages = totalPages;
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

