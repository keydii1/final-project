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
// [GET] admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Function để tạo cây thư mục
        const createTree = createTreeHelper.Tree;
        
        // Lấy record cần edit
        const findCondition = {
            deleted: false,
            _id: id
        };
        const record = await productCategory.findOne(findCondition);
        
        // Lấy tất cả categories để tạo dropdown
        const allCategories = await productCategory.find({deleted: false});
        const treeData = createTree(allCategories);
        
        if(record){
            res.render("admin/pages/product-category/edit.pug", {
                pageTitle: "Cập nhật danh mục sản phẩm",
                prefixAdmin: systemConfig.prefixAdmin,
                record: record,
                categories: treeData
            });                    
        } else {
            req.flash('error', 'Không tìm thấy danh mục');
            res.redirect(`${systemConfig.prefixAdmin}/product-category`);
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Có lỗi xảy ra');
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}

module.exports.PatchPost = async (req,res) => {
    try {
        const id = req.params.id;
        
        // Xử lý position
        if(req.body.position === ""){
            const count = await productCategory.countDocuments({});
            req.body.position = count + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
        
        // Cập nhật record
        await productCategory.updateOne({_id: id}, req.body);
        req.flash('success', 'Cập nhật danh mục thành công!');
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    } catch (error) {
        console.log(error);
        req.flash('error', 'Có lỗi xảy ra khi cập nhật');
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}
