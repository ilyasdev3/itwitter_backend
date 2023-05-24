const router = require("express").Router()
const verifyToken = require("../utils/verifyToken")
const {controller} = require('../controllers/user.controller')




router.get("/get-user", controller.getUser)
router.put("/update-user",verifyToken, controller.updateUser)
router.delete("/delete-user/:userId",verifyToken, controller.deleteUser)





module.exports = router