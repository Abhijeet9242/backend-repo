const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    gender: {type:String, required:true},
    dob: {type:String, required:true}

},{
    versionKey:false
   
})

// const User = mongoose.model("user", userSchema)
// module.exports = User

module.exports = mongoose.model("user", userSchema)