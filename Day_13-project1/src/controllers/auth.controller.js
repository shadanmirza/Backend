const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const {username, email, password, bio, profileImage} = req.body

    // const isUserExsitByEmail = await userModel.findOne({email})

    // if (isUserExsitByEmail) {
    //     return res.status(409).json({
    //         message:"this email is used by someone eles"
    //     })
    // }

    // const isUserExsitByUsername = await userModel.findOne({username})

    // if (isUserExsitByUsername) {
    //     return res.status(409).json({
    //         message:"try diffrent username"
    //     })
    // }

    // here we calling database two times to find user already exist or not

    const isUserAdreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAdreadyExists){
        return res.status(409).json({
            message:"user already exists" + (isUserAdreadyExists.email == email ? "email already exists" : "username already exists" )
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash,
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(201).json({
        message: "user register successfully",
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage
    })
}

async function loginController(req,res){
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(200).json({
        message:"user login successfully.",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage  
        }
    })
}

module.exports = {
    registerController,
    loginController
}