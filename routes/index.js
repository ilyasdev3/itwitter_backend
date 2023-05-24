const router = require("express").Router()
const authRoutes = require("../routes/auth.routes")
const postRoutes = require("../routes/post.routes")
const userRoutes = require("../routes/user.routes")
const likeRoutes = require("../routes/like.routes")
const commentRoutes = require("../routes/comment.routes")
const followRoutes = require("../routes/following.routes")


router.use("/auth", authRoutes)
router.use("/post", postRoutes)
router.use("/user", userRoutes)
router.use("/like", likeRoutes)
router.use("/comment", commentRoutes)
router.use("/follow", followRoutes)

module.exports = router

