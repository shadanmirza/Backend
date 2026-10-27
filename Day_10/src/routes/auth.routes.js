const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authRouter = express.Router()  //if we want to create api other then app.js we need router or this line

authRouter.post("/register",async (req,res)=>{
    const {name, email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message:"this email is already used by someone"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign(
        {
            id: user._id,
            // email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

module.exports = authRouter
