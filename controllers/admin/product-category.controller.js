const systemConfig = require("../../config/system")
const productCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree");
//[GET] admin/product-category
module.exports.index = async (req, res) => {
    const findCondition = {deleted: false};
    const productCategories = await productCategory.find(findCondition);
    
    res.render("admin/pages/product-category/index.pug", {
        pageTitle: "Danh sách danh mục sản phẩm",
        record: productCategories,
        prefixAdmin: systemConfig.prefixAdmin
    })
}
// [GET] admin/product-category/create
module.exports.create = async (req, res) => {
    // Function để tạo cây thư mục
    const createTree = createTreeHelper.Tree;

    const findCondition = {deleted: false};
    const productCategories = await productCategory.find(findCondition);
    const treeData = createTree(productCategories);

    res.render("admin/pages/product-category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm",
        prefixAdmin: systemConfig.prefixAdmin,
        record: treeData
    });
}
// [POST] amdin/product-category/create
module.exports.createPost = async (req,res) => {
    console.log(req.body)
    if(req.body.position === ""){
        const count = await productCategory.countDocuments({});
        req.body.position = count + 1;
    }else{
        req.body.position=parseInt(req.body.position)
    }
    const recordOfProductCategory = new productCategory(req.body);
    await recordOfProductCategory.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`)
}