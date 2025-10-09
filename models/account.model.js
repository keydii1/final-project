const mongoose = require("mongoose");
const generate = require("../helpers/generate"); 

const accountSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token:{
        type: String,
        default: generate.generatRandomString(50)
    },
    phone: String,
    avatar: String,
    role_id:String,
    status : String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
}

,{ collection: "accounts" });
const Accounts = mongoose.model("accounts", accountSchema);
module.exports = Accounts;