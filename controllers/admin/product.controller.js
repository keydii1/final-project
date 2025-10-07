const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/searchHelper");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const paginationHelper = require("../../helpers/panigation");
const router = require("../../routes/admin/products.route");
const systemconfig = require("../../config/system.js");
module.exports.index = async (req, res) => {
    const fillterStatus = fillterStatusHelper(req.query.status);

    let findCondition = {
        deleted: false, // to check not deleted products
    };
    
    let searchObject = searchHelper(req);


    let keyword = "";
    if(searchObject !== null) {
        // assign regex variabl to title to find the title that same with this title
        findCondition.title = searchObject.regex;
        keyword = searchObject.keyword;
    }
    
    if(req.query.status){
        findCondition.status = req.query.status;
    }

    const countProducts = await Product.countDocuments(Product.find(findCondition));
    
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort = {position: "asc"};
    }
    let objectPagination = paginationHelper({
        currentPage: 1, limitItems: 3
    }, req,countProducts);
    const products = await Product.find(findCondition)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
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
    // this params usually combine with patch method
     const status = req.params.status;
     console.log(status);
      const id = req.params.id;
      await Product.updateOne({ _id: id } , { status: status});
    req.flash('success', 'Updated successfully');

        const backURL = req.header('Referer') || '/admin/products';
        res.redirect(backURL);
}
module.exports.changeMulti = async(req,res) => {
    const type = req.body.type;
    const ids = req.body.ids. split(","); // convert string to array
    switch(type){
        case "active":
            // function to change status to active in mongoose
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            req.flash('success', `Updated ${ids.length} item successfully`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            req.flash('success', `Updated ${ids.length} item successfully`);
            break;
        case "selected-delete":
            // soft delete 
            await Product.updateMany({_id: {$in: ids}}, {deleted: true,
                deletedAt: new Date()
            });
            req.flash('success', `Deleted ${ids.length} item successfully`);
            break;
        case "change-position":
            for(const item of ids){
                const parts = item.split(":");
                const id = parts[0];
                const position = parseInt(parts[1]) || 0;
                await Product.updateOne({_id: id}, {position: position});
            }
            req.flash('success', `Changed position of ${ids.length} item successfully`);
            break;
        default:
            break;;
    }
        
        const backURL = req.header('Referer') || '/admin/products';
        res.redirect(backURL);
}

// delete item
module.exports.deleteItem = async(req,res) => {
    const id = req.params.id;
    // hard delete
    // await Product.deleteOne({_id: id});
    // sofft delete
     await Product.updateOne({_id: id}, {deleted: true,
        deletedAt: new Date()
     });
    const backURL = req.header('Referer') || '/admin/products';
    res.redirect(backURL);
}
// end of delete item

// change position

module.exports.create = async(req,res) => {
res.render("admin/pages/product/create.pug", {
    pageTitle: "Create New Product"
});
}
module.exports.createPost = async(req,res) => {
    req.body.price = parseFloat(req.body.price) || 0;
    req.body.stock = parseInt(req.body.stock) || 0;
    req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
    if(req.body.position===""){
        let countProducts = await Product.countDocuments(Product.find({deleted: false}));
        countProducts +=1;
        req.body.position = countProducts;
    }
    else{ req.body.position = parseInt(req.body.position) || 0;}
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`${systemconfig.prefixAdmin}/products`);
}

module.exports.edit = async(req,res) => {
    try{
    console.log(req.params.id);
    const findCondition = {
        deleted: false,
        _id: req.params.id
    };
    const product = await Product.findOne(findCondition);
    console.log(product);
    res.render("admin/pages/product/edit.pug", {
    pageTitle: "Create New Product",
    product: product
});
    }
    catch(err){
        res.redirect(`${systemconfig.prefixAdmin}/products`);
    }
}

module.exports.editPatch = async(req,res) => {
    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock) ;
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position) ;
    if(req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;
    try{
    await Product.updateOne({_id: req.params.id}, req.body);
    req.flash('success', 'Updated successfully');
    }
    catch(err){
        req.flash('error', JSON.stringify(err));
    }
    res.redirect(`${systemconfig.prefixAdmin}/products`);
}

module.exports.detail = async(req,res) => {
    console.log(req.params.id);
    const findCondition = {
        deleted: false,
        _id: req.params.id
    };
    const product = await Product.findOne(findCondition);
    res.render("admin/pages/product/detail.pug", {
        pageTitle: "Product Detail Page",
        product: product
    });
}




