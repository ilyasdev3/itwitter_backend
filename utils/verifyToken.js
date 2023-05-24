const STATUS = require('../constant/status')
const jwt = require("jsonwebtoken")

const verifyToken = (req,res, next)=>{
    const header = req.headers.authorization
    if(!header){
        return res.status(STATUS.UNAUTHORIZED).json({message:"Token not found"})
    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err){
            return res.status(STATUS.UNAUTHORIZED).json({message:"Not Allowed"})
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken