const express = require("express")

const Evaluation = require("../models/evaluation.model")

const router = express.Router()


router.post("", async (req,res) => {
    try{
        const evaluation = await Evaluation.create(req.body)
          
        return res.status(201).send(evaluation)
    }
    catch(e){
        return res.status(500).send({message:e.message,status:"failed"})
    }
    
})


router.get("", async (req, res) => {
   try{
       const evaluation = await Evaluation.find().populate("topic").lean().exec()
       return res.send(evaluation)
   }
   catch(e){
       return res.status(500).send({message:e.message,status:"failed"})
   }
   

});

module.exports = router