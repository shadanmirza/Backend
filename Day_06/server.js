/*
* — server ko start krna
* — database se connect krna
*/

const app = require("./src/index")
const mongoose = require("mongoose")

function connectedToDB() {
    mongoose.connect("mongodb+srv://rocksd7189_db_user:gDhJ19BIiMP1VSPl@cluster0.30xgcye.mongodb.net/Day_06")
    .then(()=>{
        console.log("server connected to Database");        
    })
}

connectedToDB()

app.listen(3000,()=>{
    console.log("server is running on prot 3000");    
})