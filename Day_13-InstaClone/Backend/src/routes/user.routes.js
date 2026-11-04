const express = require("express")
const followModel = require("../models/follow.model")
const UserController = require("../controllers/user.controller")
const identifyUser = require("../middleware/auth.middleware")

const userRouter = express.Router()


/**
* @route POST /api/users/follow/:userid 
* @description Follow a user 
* @access Private 
*/ 
userRouter.post("/follow/:username", identifyUser, UserController.followUserController)

/**
 * @route POST /api/users/unfollow/:userid
 * @description unfollow a user
 * @access Private
 */
userRouter.delete("/unfollow/:username", identifyUser, UserController.unfollowUserController)


/**
 * @route GET /api/users/followRequest
 * @description get the follow request
 * @access Private
 */
userRouter.get("/followRequest", identifyUser, UserController.getfollowRequestController)


/**
 * @route PATCH /api/users/changeStatus/:username
 * @description update status accspted
 * @access Private
 */
userRouter.patch("/changeStatus/:username", identifyUser, UserController.respondFollowRequestController)


module.exports = userRouter
