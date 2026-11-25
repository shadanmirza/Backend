const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "username is required"],
        unique: [true, "username should be unique" ]
    },
    email: {
        type: String,
        required: [true, "email is required" ],
        unique: [true, "email should be unique" ]
    },
    password: {
        type: String,
        required: [true, "password is required" ],
        select: false
    }
})

// .pre Middleware that runs befour it save in database 
userSchema.pre("save", async function(){
    // Check whether the password was modified
    if (!this.isModified("password")) {
        return
    }

    // hash the password
    this.password = await bcrypt.hash(this.password, 10);
})

// .post e Middleware that runs after it save in database 
userSchema.post("save", function() {
    console.log("User saved successfully!");
});


const userModel = mongoose.model("users", userSchema )

module.exports = userModel