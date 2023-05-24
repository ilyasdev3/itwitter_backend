
const Comment = require("../models/Comment")
const User = require("../models/User")
const STATUS = require('../constant/status')
const Post = require("../models/Post")

let controller ={}

controller.createComment = async(req,res)=>{
    const user = req.user;
    const userId = user.id;

    if(!userId){
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not logged in"})
    }
    const {postId} = req.params
    const post = await Post.findById(postId)
    if(!post){
        return res.status(STATUS.NOT_FOUND).json({message:"Post not found"})
    }
    const comment = await Comment.create({userId, postId, text:req.body.text})
    if(!comment){
        return res.status(STATUS.BAD_REQUEST).json({message:"Comment not added"})   
    }
    return res.status(STATUS.SUCCESS).json({message:"Comment added"})
}

controller.getComments = async (req,res)=>{
    const {postId} = req.params
    if(!postId){
        return res.status(STATUS.NOT_FOUND).json({message:"Post not found"})
    }
   const comments = await Comment.find({postId})
   if(!comments){
    return res.status(STATUS.NOT_FOUND).json({message:"Comments not found"})
}
return res.status(STATUS.SUCCESS).json({message:"Comments found", comments})
}

controller.getSingleComment = async(req, res)=>{
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment){
        return res.status(STATUS.NOT_FOUND).json({message:"Comment not found"})
    }
    return res.status(STATUS.SUCCESS).json({message:"Comment found", comment})
}
controller.updateComment = async(req, res)=>{
    const user = req.user;
    const isAdmin = user.isAdmin
    const userId = user.id;  // logged in userID
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment){
        return res.status(STATUS.NOT_FOUND).json({message:"Comment not found"})
    }
    if(comment.userId ==userId || isAdmin === true){
        comment.text = req.body.text
        await comment.save()
        return res.status(STATUS.SUCCESS).json({message:"Comment updated"})
    }
    return res.status(STATUS.UNAUTHORIZED).json({message:"Unauthorized"})
}

controller.daleteComment = async(req, res)=>{
    const user = req.user;
    const userId = user.id;  // logged in userID
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment){
        return res.status(STATUS.NOT_FOUND).json({message:"Comment not found"})
    }
    if(comment.userId==userId || user.isAdmin){
        await comment.deleteOne()
    }
    return res.status(STATUS.SUCCESS).json({message:"Comment deleted"})
}


module.exports ={controller}