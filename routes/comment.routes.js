const router = require("express").Router()
const {controller} = require('../controllers/comment.controller')
const verifyToken = require("../utils/verifyToken")



router.post("/create-comment/:postId",verifyToken,  controller.createComment)
router.get("/get-comments/:postId",  controller.getComments)
router.get("/get-comment/:commentId",  controller.getSingleComment)
router.put("/update-comment/:commentId",verifyToken,  controller.updateComment)
router.delete("/delete-comment/:commentId",verifyToken,  controller.daleteComment)



module.exports = router