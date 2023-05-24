const mongoose = require('mongoose')

const followingSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
})

const Following = mongoose.model('Following', followingSchema)

module.exports = Following