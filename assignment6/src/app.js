const express = require("express")
// const mongoose = require("mongoose")
const connect = require("./config/db")

const app = express();
app.use(express.json());



// const topicmodel = require("./models/topic.model")

const topiccontroller = require('./controllers/topic.controller')
const usercontroller = require('./controllers/user.controller')
const evaluationcontroller = require('./controllers/evaluation.controller')
const studentcontroller = require('./controllers/student.controller')

app.use('/topic', topiccontroller)
app.use('/user', usercontroller)
app.use('/evaluation', evaluationcontroller)
app.use('/student', studentcontroller)



app.listen(2780, async() => {
    await connect()
    console.log("listening on port 2780")
})