// there is only two task of this file 
// 1. Is to create server 
// 2. To config the server 

const express = require("express")

const app = express()         // server create ho jata hai
app.use(express.json())

const notes = []



/* Api method = post
   Api name = /notes
*/
app.post("/notes",(req, res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send("notes created");   
})


/* Api method = get
   Api name = /notes
*/
app.get("/notes",(req, res)=>{
    res.send(notes)    
})


/* Api method = delete
   Api name = /notes
*/
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index] 

    res.send("note deleted")
})


/* PATCH /notes/:index */
/* req.body = {description :- "sample modified description'} */
app.patch("/notes/:index",(req, res)=>{
    notes[req.params.index].description = req.body.description

    res.send("notes updated")
})

module.exports = app