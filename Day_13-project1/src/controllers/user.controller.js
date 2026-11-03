const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "you can not follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message: "user are you trying to follow does not exist"
        }) 
    }

    const isAdreadyFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(isAdreadyFollowing){
        return res.status(200).json({
            message: `you are already following ${followeeUsername}`,
            follow: isAdreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `follow request send to ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `unfollowed ${followeeUsername}`
    })
}

async function getfollowRequestController(req,res){
    const requests = await followModel.find({
        followee: req.user.username,
        status: "pending"
    }).sort({ createdAt: -1 })

    res.status(200).json({
        message: `you have ${requests.length} follow request(s)`,
        requests
    })
}

async function respondFollowRequestController(req, res) {
    const { status } = req.body // "accepted" or "rejected"
    const { username } = req.params // follower's username

    if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "status must be accepted or rejected" })
    }

    const request = await followModel.findOneAndUpdate(
        { follower: username, followee: req.user.username, status: "pending" },
        { status },
        { returnDocument: "after", runValidators: true }
    )

    if (!request) {
        return res.status(404).json({ message: "no pending request from this user" })
    }

    res.status(200).json({ message: `request ${status}`, follow: request })
}

module.exports = {
    followUserController,
    unfollowUserController,
    getfollowRequestController,
    respondFollowRequestController
}
