const Product = require("../../models/product.model");


module.exports.product = async (req, res) => {
    let fillterStatus = [
        {
            name: "Tất cả",
            status :"all",
            class:"btn btn-success"

        },
        {
            name: "Đang hoạt động",
            status :"active",
            class:""

        },
        {
            name: "Dừng hoạt động",
            status :"inactive",
            class:""

        },
    ]
    if(req.query.status === 'active') {
        fillterStatus[1].class = "btn btn-success";
        fillterStatus[0].class = "";
    }else if(req.query.status === 'inactive'){
        fillterStatus[2].class = "btn btn-success";
        fillterStatus[0].class = "";
    }
    let findCondition = {
        deleted: false, // to check not deleted products
    };
    if(req.query.status){
        findCondition.status = req.query.status;
    }
     console.log(req.query.status);
     console.log(findCondition.status);
    const products = await Product.find(findCondition);

    // console.log(products);
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin Product Page",
        products: products,
        fillterStatus: fillterStatus
    });

}
