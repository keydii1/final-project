const systemConfig = require("../../config/system")
const Role = require("../../models/role.model")
module.exports.index = async (req,res) => {
    const findCondition  = {
        deleted:false
    }
    const record = await Role.find(findCondition);
    res.render("admin/pages/roles/index.pug",{
        pageTitle:"Nhóm quyền",
        record: record
    });
}
module.exports.create = async (req,res) => {
    res.render("admin/pages/roles/create.pug",{
        pageTitle:"Tạo nhóm quyền"
    })
}
module.exports.createPost = async(req,res) => {
    const record = new Role(req.body)
    await record.save();
    console.log(req.body)
    res.redirect(`${systemConfig.prefixAdmin}/role`)
}
