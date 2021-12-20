const express = require("express")
const router = express.Router()


const admin = require("../models/admin.model")

router.post("", async(req,res) => {
    try{
        const admins = await admin.create(req.body)
        return res.send({admins})
    }
    catch(e){
        res.status(500).json({message:e.message, status:"failed"})
    }
   
})



router.get("",async(req, res)=>{
    try{
        const admins= await admin.find().lean().exec();
        return res.send(admins);
    }catch(e){
        return res.status(500).json({ message: e.message, status:"Failed"})
    }
})

router.get("/", async(req,res) => {
    const admin = await findByIdAndDelete(req.params.id)
    return res.status(200).send(admin)
})

module.exports = router