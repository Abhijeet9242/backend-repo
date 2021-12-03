const express = require("express")

const User = require("../models/user.model")

const router = express.Router()


router.post("", async (req,res) => {
    try{
        const user = await User.create(req.body)
          
        return res.status(201).send(user)
    }
    catch(e){
        return res.status(500).send({message:e.message,status:"failed"})
    }
    
})


router.get("", async (req, res) => {
   try{
       const user = await User.find().lean().exec()
       return res.send(user)
   }
   catch(e){
       return res.status(500).send({message:e.message,status:"failed"})
   }
   

});

module.exports = router