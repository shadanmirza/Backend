const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
    const {name, email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "this email is use by someone eles"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign(
        {
        id: user._id
        },process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user register",
        user,
        token
    })


})

authRouter.post("/protected",(req,res)=>{

    console.log(req.cookies);

    const c = req.cookies

    res.status(200).json({
        message:"we got you",
        c
    })
})

/*
* /api/auth/login
* controler => api call back function also called controler because it runs when user hits api
*/
authRouter.post("/login",async (req,res)=>{
    const {email, password} = req.body

    const user =await userModel.findOne({email})

    if (!user) {
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isPasswordRight = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordRight) {
        return res.status(401).json({
            message:"password is wrong"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user login successfully",
        token,
        user
    })
})

module.exports = authRouter