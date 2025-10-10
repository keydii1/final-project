const systemConfig = require("../../config/system")
const Accounts = require("../../models/account.model")
const Role = require("../../models/role.model")
module.exports.requireFor = async(req,res,next) => {
    if(!req.cookies.token) {
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
    else {
        const account = await Accounts.findOne({token: req.cookies.token}).select("-password");
        const role = await Role.findOne({_id: account.role_id, deleted: false}).select("title permissions");
        if(!account) {
            return res.redirect( `${systemConfig.prefixAdmin}/auth/login`)
        }else{
            if(role) {
                res.locals.role = role;
            }
            res.locals.account = account;
             next();
        }
   
}
}