const systemConfig = require("../../config/system")
const productCategory = require("../../models/product-category.model")
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
// GETadmin/product/-category/create
module.exports.create = (req,res) => {
    res.render("admin/pages/product-category/create.pug",{
        pageTitle:"hello",
        prefixAdmin: systemConfig.prefixAdmin
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