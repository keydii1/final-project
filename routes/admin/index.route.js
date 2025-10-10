    const dashboardRoutes = require("./dashboard.route");
    const productRoutes = require("./products.route");
    const productCategory =  require("./product-category.route")
    const systemConfig = require("../../config/system");
    const roleRoutes = require("./role.route")
    const accountRoutes = require("./account.route")
    const authenRoutes = require("./auth.route")
    const requireAuthen = require("../../middlewares/admin/authen.middleware")
    module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +"/dashboard", requireAuthen.requireFor,dashboardRoutes);
    app.use(PATH_ADMIN +"/products",requireAuthen.requireFor, productRoutes);
    app.use(PATH_ADMIN +"/product-category",requireAuthen.requireFor,productCategory);
    app.use(PATH_ADMIN +"/role",requireAuthen.requireFor, roleRoutes);
    app.use(PATH_ADMIN +"/accounts",requireAuthen.requireFor, accountRoutes);
    app.use(PATH_ADMIN +"/auth", authenRoutes);
    }
