const systemConfig = require("../../config/system")
const Accounts = require("../../models/account.model")
module.exports.requireFor = async(req,res,next) => {
    if(!req.cookies.token) {
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
    else {
        const account = await Accounts.findOne({token: req.cookies.token, deleted: false});
        if(!account) {
            return res.redirect( `${systemConfig.prefixAdmin}/auth/login`)
        }else{
             next();
        }
   
}
}