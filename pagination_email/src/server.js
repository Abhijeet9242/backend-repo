const app = require("./index")

// app.listen(2345, async(req,res) => {

// })
const connect = require("./config/db")

app.listen(2893 ,async function() {
    await connect()
    console.log("listening on port 2893")
});