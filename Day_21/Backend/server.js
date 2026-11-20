const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config()
const app = require("./src/App")
const ConnectedToDb = require("./src/config/database")


ConnectedToDb()

app.listen(3000, ()=>{
    console.log("server is started in port 3000")
})