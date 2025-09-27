module.exports.product = (req, res) => {
        console.log("here is products page");
        res.render("client/pages/products/index.pug", {
            pageTitle: "Products Page"
        });
    }