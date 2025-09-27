const mongoose = require("mongoose");
module.exports.connect = async () => {
    try{
      await  mongoose.connect(process.env.MONGODB_URL)
      console.log("Connect DB successfully")
    }
    catch(err){
        console.log("Connect DB fail")
    }
}
