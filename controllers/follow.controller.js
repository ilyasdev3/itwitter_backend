const Follower = require("../models/Follower")
const Following = require("../models/Following")
const User = require("../models/User")
const STATUS = require('../constant/status')

let controller ={}

controller.createFollower = async (req,res)=>{
   
    const user = req.user; 
    const userId = user.id; // logged in userid
    const findUserId = req.query.userId
    const loggedUser = await User.findById(findUserId) // logged in user
    const findUser = await User.findById(findUserId) // jisko follow krna he 
    if(!findUser){
        return res.status(STATUS.NOT_FOUND).json({message:"User not found"})
    }
    const createFollower = await Follower.create({userId})
    const createFollowing = await Following.create({userId:findUser._id})
    return res.status(STATUS.SUCCESS).json({message:"You are following now"})
}

module.exports = {controller}