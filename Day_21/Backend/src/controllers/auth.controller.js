const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blacklistModel = require("../models/blacklistModel")
const redis = require("../config/cache")

async function registerUser(req, res) {
    const {username, email, password} = req.body

    const isAlreadyRegister = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isAlreadyRegister) {
        return res.status(400).json({
            message: "user exist with same email or password you entered"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })  

    res.cookie("token", token)

    return res.status(201).json({
        message: "user register successfully",
        user: {
        id: user._id,
        username: user.username,
        email: user.email
        }
    })
}

async function loginUser(req, res) {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }

    const token = jwt. sign(
    {
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    })

    res.cookie("token", token)

    return res.status(200).json({
        message: " user logged in successfully ",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "user fatched successfully",
        user
    })
}

async function logoutUser(req, res) {
    token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString())

    res.status(200).json({
        message: "logout successfully."
    })
}

module.exports = { registerUser, loginUser, getMe, logoutUser }