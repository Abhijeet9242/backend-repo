const express = require("express")
const router = express.Router()

const sendMail = require("../util/send_mail")
const admin = require("../models/admin.model")

const user = require("../models/user.model")




router.post("/register", async(req,res) => {
    try{
  const users = await user.create(req.body)

  const admins = await admin.find().lean().exec()

  for(var i=4;i<=admins.length;i++){
    //   console.log(admins.length)
    sendMail(
        "abhijeet123@gmail.com",
        `${admins[i].email}`,
        `${req.body.first_name} ${req.body.last_name} has registered with us`,
        `please welcome ${req.body.first_name} ${req.body.last_name}`,
        `<h1>please welcome ${req.body.first_name} ${req.body.last_name}`
        )
    };

    sendMail(
        "abhijeet123@gmail.com",
        `${req.body.email}`,
        `welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
        `Hi ${req.body.first_name} ${req.body.last_name}, Please confirm your email address `,
        `<h1>Hi ${req.body.first_name} ${req.body.last_name}, Please confirm your email address <h1>`
        );
        return res.status(201).json({users});

    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})

router.get("/", async (req, res) => {
    try {
        const page=+req.query.page || 1;
        const size=+req.query.size || 2;
        
        
        const skip=(page-1)*size;

        const users = await user.find().lean().skip(skip).limit(size).exec();

        const totalPages =Math.ceil((await user.find().countDocuments())/size)

        return res.json({users,totalPages} );

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

module.exports=router;





module.exports = router