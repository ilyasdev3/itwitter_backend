const router = require("express").Router()
const {controller} = require('../controllers/follow.controller')
const verifyToken = require("../utils/verifyToken")




router.post("/create-follow",verifyToken,  controller.createFollower)


// router.post("/login",controller.login)


module.exports = router