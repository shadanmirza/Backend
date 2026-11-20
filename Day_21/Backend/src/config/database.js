const mongoose = require("mongoose")

async function ConnectedToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database successfully")
    })
    .catch(err=>{
        console.log("Error connected to DB", err)
    })
}

module.exports = ConnectedToDb