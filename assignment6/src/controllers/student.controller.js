const express = require("express")

const Student = require("../models/student.model")

const router = express.Router()


router.post("", async (req,res) => {
    try{
        const students = await Student.create(req.body)
          
        return res.status(201).send(students)
    }
    catch(e){
        return res.status(500).send({message:e.message,status:"failed"})
    }
    
})


router.get("", async (req, res) => {
   try{
       const student = await Student.find().populate("details").populate("user").lean().exec()
       return res.send(student)
   }
   catch(e){
       return res.status(500).send({message:e.message,status:"failed"})
   }
   

});

router.delete("/:id",async (req,res) => {
    try{
    const student = await Student.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(200).send(student) 

    }catch(e){
        return res.status(500).send({message:e.message,status:"failed"})
    }
    
   
});


router.get("/highscore", async(req,res) => {
    try{
        const students = await Student.find().populate("user").lean().exec()
        let a1 = []
        let max = -1
    
        for(let i=0; i<students.length;i++){
            let d = students[i].details
            for(let j=0; j<d.length;j++){
                console.log(d[j].marks)
                if(max < d[j].marks){
                    max= d[j].marks;
                }
            }
        }
        // res.send(a1);
        for(let i=0; i<students.length; i++){
            let d=students[i].details;
            for(let j=0; j<d.length; j++){
                if(d[j].marks===max){
                    a1.push(students[i]);
                }
            }
        }
        res.send(a1);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
   

})


router.get('/:evalId', async (req, res) => {
    try{
        const students =await Student.find({}).lean().exec();
        let a1=[];
        for(let i=0; i<students.length; i++){
            let d=students[i].details;
            for ( let j=0; j<d.length; j++){
                if(req.params.evalId===d[j].eval){
                    a1.push(students[i]);
                }
            }
        }
        res.send(a1);

    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})


module.exports = router