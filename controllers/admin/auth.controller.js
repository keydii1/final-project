
const Accounts = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model")
var md5 = require('md5');

module.exports.index = async (req,res) => {
 res.render("admin/pages/auth/index.pug",{
    pageTitle:"Đăng nhập"
 }); 
}