const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const STATUS = require('../constant/status')

let controller ={}

controller.getUser = async(req,res)=>{
   const userId = req.query.userId;

    const user =await User.findById(userId)
    if(!user){
        return res.status(STATUS.NOT_FOUND).json({message:"User not found"})
    }
    const { password,email, isAdmin,  ...userWithoutPass } = user._doc
    return res.status(STATUS.SUCCESS).json({message:"User found",user:userWithoutPass})
}
controller.updateUser = async(req,res)=>{
   const userId = req.user.id
   console.log(userId, "userId");
   if(!userId){
    return res.status(STATUS.METHOD_NOT_ALLOWED).json({message:"You are not logedin"})
   }
    const user =await User.findById(userId)
    if(!user){
        return res.status(STATUS.NOT_FOUND).json({message:"You are not authorized"})
    }
    console.log(user._id, "_user._id");
    if(userId !=user._id ){
        return res.status(STATUS.UNAUTHORIZED).json({message:"You are not authorized"})
    }
    
    await User.findByIdAndUpdate(userId, {...req.body}, {new:true})

    return res.status(STATUS.SUCCESS).json({message:"User updated successfully"})
}

controller.deleteUser = async(req,res)=>{
    const userId = req.params.userId 
    const logedInUser = req.user
    if(!userId){
        return res.status(STATUS.METHOD_NOT_ALLOWED).json({message:"You are not logedin"})
       }
        const user =await User.findById(userId)
        if(!user){
            return res.status(STATUS.NOT_FOUND).json({message:"You are not authorized"})
        }

        if(userId ==logedInUser.id || logedInUser.isAdmin == true){
            await User.findByIdAndDelete(userId)
        return res.status(STATUS.SUCCESS).json({message:"User deleted successfully"})
        }
        
       return res.status(STATUS.UNAUTHORIZED).json({message:"You are not authorized"})
}



module.exports = {controller}