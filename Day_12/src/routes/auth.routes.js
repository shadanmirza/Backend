const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register",async (req, res)=>{
    const {name, email, password} = req.body

    const isUserAlreadyExist =await userModel.findOne({email})

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message:"this email used my someone else"
        })
    }


    const user =await userModel.create({
        name, email, password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user register successfully",
        user: {
           name: user.name,
           email: user.email,
        },
        token
    })
})

authRouter.get("/get-me",async(req,res)=>{
    const token = req.cookies.jwt_token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id) 

    res.json({
        name: user.name,
        email: user.email,
    })
})

authRouter.post("/login",async (req,res)=>{
    const {email, password} = req.body

    const user =await userModel.findOne({email})

    if (!user) {
        return res.status(409).json({
            message: "user not found, try with right email"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    
    const isPasswordRight = hash === user.password

    if (!isPasswordRight) {
        return res.status(401).json({
            message:"password is wrong"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("jwt_token",token)

    res.status(200).json({
        message: "user login successfully",
        user:{
            name: user.name,
            email: user.email,
        }
    })
})


module.exports = authRouter