const express = require("express")
const path = require('path')
const router = express.Router()
const app = express()

const userdata = require("./database")

app.get("/",function(req,res){
    res.send(`<h1>welcome to homepage</h1>`)
})
app.get("/users",function(req,res){
    // res.send(`<h1>welcome f4f4f4f4to homepage</h1>`)
    res.sendFile(path.join(__dirname, './database.json'))
})

app.listen(2347,function(){
    console.log("app is listening at port no 2347")
})