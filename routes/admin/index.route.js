    const dashboardRoutes = require("./dashboard.route");
    const productRoutes = require("./products.route");
    const productCategory =  require("./product-category.route")
    const systemConfig = require("../../config/system");
    const roleRoutes = require("./role.route")
    const accountRoutes = require("./account.route")
    module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +"/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN +"/products", productRoutes);
    app.use(PATH_ADMIN +"/product-category",productCategory);
    app.use(PATH_ADMIN +"/role", roleRoutes);
    app.use(PATH_ADMIN +"/accounts", accountRoutes);


    }
