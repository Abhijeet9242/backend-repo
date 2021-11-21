const express = require("express")
// console.log(express)
const users = require("./book.json")
const app = express()
app.use(express.json())


app.get("/",(req,res) => {
    res.send( {users})
})

app.post("/books",(req,res) => {
    const newbook = [...users,req.body]
    // console.log(req.body)
   res.send(newbook)
})

app.get("/books/:id",(req,res) => {
    const newuser = users.filter( (user) => user.id === Number(req.params.id))
    res.send(newuser)
   
})

app.patch("/books/:id" ,(req,res) => {

    const newuser = users.map( (user) => {

        if(Number(req.params.id) === user.id){
            // user = req.body
            // return req.body
        //   console.log(req.params.id)
            //opional chaining
            if (req?.body?.id) (user.id) = req.body.id
            if (req?.body?.fullname) user.fullname = req.body.fullname
            if (req?.body?.book) user.book = req.body.book
            if (req?.body?.gender) user.gender = req.body.gender
            if (req?.body?.email) user.email = req.body.email
           
        }
        return user
    })
    res.send(newuser)
})

app.delete("/books/:id",(req,res) => {
    const newuser = users.filter( (user) => user.id !== Number(req.params.id))
    res.send(newuser)
   
})


app.listen(2391,() => {
    console.log("this listen run on port 2391")
})