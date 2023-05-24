const Post = require("../models/Post")
const Following = require("../models/Following")

const STATUS = require("../constant/status")

const cloudinary = require('cloudinary').v2;
// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

let controller = {}

controller.createPost = async(req,res)=>{
    const user = req.user
    const photo = req.files.photo
    // console.log(photo, "photo");
  
try {
  const result =   await cloudinary.uploader.upload(photo.tempFilePath, (err,result)=>{
    })
    const post = await new Post({ userId:user.id, photo:result.secure_url , title:req.body.title})
    await post.save()
    return res.status(STATUS.SUCCESS).json({message:"post created", post})

} catch (error) {
    console.log(error);
}

}
controller.getPost = async(req,res)=>{
    const id = req.query.params
    if(!id){
        return res.status(STATUS.NOT_FOUND).json({message:"PostId required"})
    }

    const post = await Post.findOne({id})
    if(!post){
        return res.status(STATUS).json({message:"post not found"})
    }
    return res.status(STATUS.SUCCESS).json({message:"post found", post})
}

// controller.getAllPosts = async(req,res)=>{
//     const posts = await Post.find()
//     if(!posts){
//         return res.status(STATUS.NOT_FOUND).json({message:"Posts Not found"})
//     }
//     return res.status(STATUS.SUCCESS).json({message:"posts found", posts})
// }

controller.getFollowingUsersPosts = async(req, res)=>{
    try {
        const user = req.user
        const userId = user.id
        const followingUsers = await Following.find({userId})
        const posts = await Post.find({userId: {$in:followingUsers}})
        console.log(posts, "posts");
    } catch (error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({message:error.message})
        
    }
}



controller.updatePost = async(req,res)=>{
    const postId = req.params.postId
    console.log(postId, "postID");
    const user = req.user
    const userId = req.user.id
    console.log(userId, "useriD");

    const post = await Post.findById(postId)
    console.log(post, "post");

    if(!userId){
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not login"})
    }
    if(userId==post.userId ){
       await Post.findByIdAndUpdate(postId, {...req.body}, {new:true})
    }
    return res.status(STATUS.SUCCESS).json({message:"posts updated successfully"})
}

controller.deletePost = async (req,res)=>{
    const postId = req.params.postId
    const isAdmin = req.user.isAdmin
    const userId = req.user.id
    console.log(postId, 'postId');
    console.log(isAdmin, 'isAdmin');
    console.log(userId, 'userId');

    if(!postId && !userId){
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not allowed to delete"})
    }
    const post = await Post.findById(postId)
    console.log(post, "post");

    const postUserId = post.userId.valueOf(); 
    console.log(postUserId, "postUserId"); 

    if(userId !==postUserId){
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not authorized"})
    }

        await Post.findByIdAndDelete(postId)
        return res.status(STATUS.SUCCESS).json({message:"Post deleted"})
}


module.exports = {controller}