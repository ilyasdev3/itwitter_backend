const mongoose = require('mongoose')

const followerSchema = new mongoose.Schema({
  
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
    
})

const Follower = mongoose.model('Follower', followerSchema)

module.exports = Follower