const router = require("express").Router()
const {controller} = require('../controllers/like.controller')
const verifyToken = require("../utils/verifyToken")




router.post("/create-like/:postId", verifyToken, controller.createLike)
router.get("/get-likes", verifyToken, controller.getAllLikes)
router.delete("/delete-like/:likeId", verifyToken, controller.deleteLike)
// router.get("/get-post/:id",controller.getPost)

// router.get("/get-post",)



module.exports = router