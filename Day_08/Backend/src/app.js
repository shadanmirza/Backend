const noteModel = require("./models/notes.models")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

/**
 * > post /api/notes
 * - create new note and save data in mongodb
 */
app.post("/notes",async (req,res)=>{
    const { title, description } = req.body

    const noteSave = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"notes created successfully",noteSave
    })
})


/** 
 * get /api/notes
 * ~ Fetch all the notes data from mongodb and send them in the response
 */
app.get("/api/notes",async (req, res)=>{
    const noteRetrive = await noteModel.find()

    res.status(200).json({
        message: "these are the notes you created",noteRetrive
    })
})


/*
* — DELETE /api/notes/:id
* - Delete note with the id from req.params
*/
app.delete("/api/notes/:id",async (req,res)=>{
    id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted"
    })
}) 

/**
  — PATCH /api/notes/:id 
* — update the description of the note by id
  - req.body = description
*/
app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description} )

    res.status(200).json({
        message:"note updated successfully"
    })
})


/**
  — PUT /api/notes/:id 
* — update title and description of the note by id
  - req.body = description,title
*/
app.put("/api/notes/:id",async (req,res)=>{
    const id = req.params.id

    const {title, description} = req.body

    await noteModel.findByIdAndUpdate(id, {title, description})

    res.status(200).json({
        message:"updated successfully"
    })
})


module.exports = app