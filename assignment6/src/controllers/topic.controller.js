const express = require("express")

const Topic = require("../models/topic.model")

const router = express.Router()


router.post("", async (req,res) => {
    try{
        const topic = await Topic.create(req.body)
          
        return res.status(201).send(topic)
    }
    catch(e){
        return res.status(500).send({message:e.message,status:"failed"})
    }
    
})


router.get("", async (req, res) => {
   try{
       const topics = await Topic.find().lean().exec()
       return res.send(topics)
   }
   catch(e){
       return res.status(500).send({message:e.message,status:"failed"})
   }
   

});

module.exports = router