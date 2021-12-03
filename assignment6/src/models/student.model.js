const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    roll_id: {type:String, required:true},
    batch: {type:String, required:true},

    details: [
        {
           eval: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"evaluation",
           },
           marks: {type:String}
        }
    ],
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{
    versionKey:false
})

module.exports = mongoose.model("student", studentSchema)