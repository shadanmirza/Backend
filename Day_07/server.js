/** 
 * to start server
 * to connect to database
 */

require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")


connectToDB()

app.listen(3000,()=>{
    console.log("server is started on port 3000");    
})