module.exports.product = (req, res) => {
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin Product Page"
    });
}