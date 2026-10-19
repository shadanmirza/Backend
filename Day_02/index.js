const express = require("express") 

const app = express()  // server instance created

app.get("/", (req, res)=>{
    res.send("hello my frens")
})

app.get("/about", function(req, res){
    res.send("this is the about page")
})


app.get("/home", (req, res)=>{
    res.send("hello my frens this is home")
})
app.listen(3000) // server started


