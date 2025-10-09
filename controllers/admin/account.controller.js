const Accounts = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model")
var md5 = require('md5');
module.exports.index = async (req,res) => {
    const findCondition  = {
        deleted:false
    }
    const recordAccount = await Accounts.find(findCondition).select("-password -token");
    const reccordRole = await Role.find(findCondition);
    for (const account of recordAccount) {
        const findRole = {
            _id: account.role_id,
            deleted: false
        }
        account.role = await Role.findOne(findRole);
        }
           
    console.log(recordAccount)
    res.render("admin/pages/account/index.pug",{
        pageTitle:"Tài khoản",
        accounts: recordAccount
    });
}
module.exports.create = async (req,res) => {   
    const findCondition  = {
        deleted:false
    }
    const record = await Role.find(findCondition);
    res.render("admin/pages/account/create.pug",{
        pageTitle:"Tạo tài khoản",
        roles: record
    })
}
module.exports.createPost = async(req,res) => {
    const emailExist = await Accounts.findOne({email: req.body.email});
    if(emailExist) {
        req.flash("error","Email đã tồn tại, vui lòng sử dụng email khác")
        return res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    }
    const record = new Accounts(req.body)
    record.password = md5(req.body.password);
    await record.save();
    console.log(req.body)
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}