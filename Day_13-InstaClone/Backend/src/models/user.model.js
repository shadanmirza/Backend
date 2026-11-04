const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required:[true, "username already exist"]
    },
    email:{
        type: String,
        unique: [true, "email already used"],
        required: [true, "email is required"]
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/g18olhqfz/profileImg.webp"
    }

})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel