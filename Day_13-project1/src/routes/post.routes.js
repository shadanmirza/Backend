const express = require("express")
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middleware/auth.middleware")

const postRouter = express.Router()

/*
* POST /api/posts 
* - req.body = { caption, image-file }
*/

postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)


/*
| * GET /api/posts/ [protected]
*/
postRouter.get("/", identifyUser, postController.getPostController)


/** 
* GET /api/posts/details/:postid
* — return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
*/
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)


/** 
* @route POST /api/posts/like/:postid
* @description like a post with the id provided in the request params.
*/
postRouter.post("/like/:postId", identifyUser, postController.likePostController)


/** 
* @route DELETE /api/posts/like/:postid
* @description unlike a post with the id provided in the request params.
*/
postRouter.delete("/like/:postId", identifyUser, postController.unlikePostController)

module.exports = postRouter