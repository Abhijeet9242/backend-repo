const app = require("./index")
const connect = require("./config/db")

app.listen(2799, ()=> {
    connect()
    console.log("listening on port 2799")
})