const app = require("./src/app")
require("dotenv").config()
const connectedToDB = require("./src/config/database")

connectedToDB()

app.listen(3000,()=>{
    console.log("server is started on port 3000");    
})
