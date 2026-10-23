/*  
  to create server
  to config server
*/

const express = require("express")
const noteModel = require("./models/notes.models")

const app = express()
app.use(express.json())

/**
 * -post 
 * req.body => {title, description}
 */

app.post("/notes",async (req,res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description 
    })
 
    res.status(201).json({
        message: "note created successfully",note
    })
})


/**
 * - get /notes
 * - fetch all the notes data that is store in Database
 */
app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"These are the stored notes",
        notes
    })
})

module.exports = app