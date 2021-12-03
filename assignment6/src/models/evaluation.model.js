const mongoose = require("mongoose")

const evaluationSchema = new mongoose.Schema({
     doe: {type:Number, required:true},
     instructor: {type:String, required:true},

     topic:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"topic",
         required:true
     }
},{
    versionKey:false
})

module.exports = mongoose.model("evaluation", evaluationSchema)