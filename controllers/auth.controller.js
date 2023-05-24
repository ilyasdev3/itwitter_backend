const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const STATUS = require('../constant/status')

let controller ={}

controller.register = async(req,res)=>{
    const email = req.body.email 
    const password = req.body.password
    const existedUser = await User.findOne({email})
    if(existedUser){
        return res.status(STATUS.BAD_REQUEST).json({message:"User already existed"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user =await new  User({
        ...req.body,
        password:hashPassword
    })
    await user.save()
    return res.status(STATUS.SUCCESS).json({message:"User register successfully"})
}


controller.login =  async(req,res)=>{


    const user =await User.findOne({email:req.body.email})
    if(!user){
        return res.status(STATUS.NOT_FOUND).json({message:"User not found"})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch){
        return res.status(STATUS.UNAUTHORIZED).json({message:"Wrong password"})
    }
    const token =await jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET)

    const {password, ...userWithoutPass} = user._doc

    return res.status(STATUS.SUCCESS).json({message:"Login is successfully", user:userWithoutPass, token})

}



module.exports ={controller}