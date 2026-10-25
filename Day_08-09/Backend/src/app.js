const noteModel = require("./models/notes.models")
const express = require("express")
const cors = require("cors")
const path = require("path")

//app.use means middleware
const app = express()
app.use(cors())
app.use(express.json())

/** 
* http://localhost:3000/assets/index-DLBImIWg.js
* http://localhost:3000/assets/index-ba2-FDEi.css
* http:// localhost :3000/assets/ index-DLBIMING=2]. js
*/
app.use(express.static("./public"))
// we are doing this because we want to run backend and frontend on 1 url,
// 1. we create the folder named public and move dist file init that we get from frontend by this command npm run bulid 
// 2. then we use  
/** 
 * app.use('*name',(req,res)=>{
    // res.send("this is a wild card")
    
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
    })
 */
// 3. To when ever someone request on http://localhost:3000/jjbfb he get index.html file of public, then it call an api (http://localhost:3000/assets/index-DLBImIWg.js* http://localhost:3000/assets/index-ba2-FDEi.css) to get css and js file to run 
// 4. then we use app.use(express.static("./public")) to page get css and js file and run the website 
// 5. if he reqset the api for access public folder with wrong file name then it send to wildcard and it send index.html file in response  

/**
 * > post /api/notes
 * - create new note and save data in mongodb
 */
app.post("/api/notes",async (req,res)=>{
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


// console.log(__dirname);
// output => H:\dev.new\Backend\Day_08-09\Backend\src

app.use('*name',(req,res)=>{
    // res.send("this is a wild card")
    
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})


module.exports = app