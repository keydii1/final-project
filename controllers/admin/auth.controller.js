
const Accounts = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model")
var md5 = require('md5');

module.exports.login = async (req,res) => {
 res.render("admin/pages/auth/login.pug",{
    pageTitle:"Đăng nhập"
 }); 
}
module.exports.loginPost = async (req,res) => {
    const {email,password} = req.body;
    const findCondition = {
        email: email,
        deleted: false
    }
    const account = await Accounts.findOne(findCondition);
    if(!account) {
        req.flash("error","Email không tồn tại")
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }else {
        if(account.password !== md5(password)) {
            req.flash("error","Mật khẩu không đúng")
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
        if(account.status === "inactive"){
            req.flash("error","Tài khoản này đã bị vô hiệu hóa")
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
    }
    res.cookie("token",account.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)

}