const systemconfig = require("../../config/system");
const Accounts = require("../../models/account.model");
const md5 = require("md5");
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index.pug", {
        pageTitle: "My Account Page"
    });
}
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
        pageTitle: "Edit My Account Page"
    });
}
module.exports.editPatch = async(req, res) => {
    // Logic to update account details goes here
    const emailExist = await Accounts.findOne({
        email: req.body.email,
        _id: { $ne: res.locals.account._id }
    });
    if(emailExist) {
        req.flash("error","Email đã tồn tại, vui lòng sử dụng email khác")
        return res.redirect(`${systemconfig.prefixAdmin}/my-account/edit`);
    }
    else {
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }
        else{
            delete req.body.password;
        }
        await Accounts.updateOne({_id: res.locals.account._id}, req.body);
    }
    req.flash("success","Cập nhật thông tin thành công");
    res.redirect(`${systemconfig.prefixAdmin}/my-account`);
}
