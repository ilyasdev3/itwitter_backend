const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        min:4,
        max:20,
        unique:true,
        required:true,
    },
    firstName:{
        type:String,
        min:4,
        max:20,
        required:true,
    },
    lastName:{
        type:String,
        min:4,
        max:20,
        required:true,
    },
    email:{
        type:String,
        min:4,
        max:20,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        min:4,
        max:100,
        required:true,
    },
    city:{
        type:String,
        min:4,
        max:20,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    country:{
        type:String,
        min:4,
        max:20,
    },
    status:{
        type:String,
        min:4,
        max:20,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Follower',
            default:0,
        },
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Following',
            default:0,
        },
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default:0,
        },
    ],

})

const User = mongoose.model('User', userSchema)

module.exports = User