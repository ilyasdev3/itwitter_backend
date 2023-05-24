
const Like = require("../models/Like")
const Post = require("../models/Post")
const User = require("../models/User")
const STATUS = require('../constant/status')

let controller ={}

controller.createLike = async(req,res)=>{
    const user = req.user 
    const postId = req.params.postId
    if(!user) {
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not logged in"})
    }
    const post = await Post.findById(postId)
    if(!post){
        return res.status(STATUS.UNAUTHORIZED).json({message:"Post not found or deleted"})
    }
    const like = await Like.create({
        userId:user.id,
        postId:post._id
    })
    return res.status(STATUS.SUCCESS).json({message:"Post liked"})
}

controller.getAllLikes = async (req,res)=>{
    const postId = req.query.postId
    const likes =await Like.find({postId})
    if(!likes){
        return res.status(STATUS.NOT_FOUND).json({message:"Posts not found"})
    }
    return res.status(STATUS.SUCCESS).json({message:"Posts found", likes})
}
controller.deleteLike = async(req,res)=>{
    const user = req.user 
    const likeId = req.params.likeId
    if(!user) {
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not logged in"})
    }

     await Like.findByIdAndDelete(likeId)
    
    return res.status(STATUS.SUCCESS).json({message:"Like removed"})
}


module.exports ={controller}