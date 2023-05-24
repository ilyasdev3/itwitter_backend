const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        max:50,
        required:true
    },
   
    photo:{
        type:String,
        default:null
    },
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post