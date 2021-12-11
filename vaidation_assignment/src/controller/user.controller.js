const express = require("express")
const { body, validationResult } = require('express-validator')

const User = require("../models/user.model")

const router = express.Router()


router.post("/",
body("first_name").exists().withMessage("first name is require"),
body("last_name").exists().withMessage("last name is require"),
body("email").exists().isEmail().withMessage("email should be valid").custom(async (value) => {
    const userbyemail = await User.findOne( {email: value})
    if(userbyemail){
        throw new Error("please write different email, this is already in use")
    }
    return true
}),
body("pincode").exists().isLength({min:6, max:6}).withMessage("pincode must be of length 6"),
body("age").exists().isInt({min:1, max:100}).withMessage("age must be between 1 to 100"),
body("gender").exists().custom(async (value) => {
    genders = ["male","female","others"]
    let checking = genders.includes(value)
    if(!checking){
        throw new Error("please write valid gender")
    }
    return true
}),
async(req,res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newerr = errors.array().map(({msg,param,location}) => {
            return {
                [param]:msg
            }
        })
      return res.status(400).json({ errors: newerr });
    }

   try{
        const user = await User.create(req.body)
        return res.status(201).json({user})
      }
      catch(e){
        return res.status(500).json({message:e.message, status:"failed"})
      }
})


module.exports = router