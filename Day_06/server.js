/*
* — server ko start krna
* — database se connect krna
*/

require("dotenv").config()
const app = require("./src/index")
const mongoose = require("mongoose")

function connectedToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("server connected to Database");        
    })
}

connectedToDB()

app.listen(3000,()=>{
    console.log("server is running on prot 3000");    
})