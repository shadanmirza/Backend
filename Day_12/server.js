const app = require("./src/app")
const connectedToDB = require("./src/config/database")

require("dotenv").config()

connectedToDB()

app.listen(3000,()=>{
    console.log("server is started on port 3000");    
})