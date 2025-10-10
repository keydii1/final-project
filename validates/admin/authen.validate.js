const systemConfig = require("../../config/system")
module.exports.loginPost = (req,res,next) => {
if(req.body.email === "" || req.body.password === "") {
    req.flash("error","Email và mật khẩu không được để trống")
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}
next();
}