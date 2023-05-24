const router = require("express").Router()
const {controller} = require('../controllers/post.controller')
const verifyToken = require("../utils/verifyToken")




router.post("/create-post", verifyToken, controller.createPost)
router.get("/get-post/:id",controller.getPost)
router.get("/get-posts", verifyToken,  controller.getFollowingUsersPosts)
router.put("/update-post/:postId", verifyToken, controller.updatePost)
router.delete("/delete-post/:postId",verifyToken  ,controller.deletePost)
// router.get("/get-post",)



module.exports = router