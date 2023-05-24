const mongoose = require('mongoose')


const connect = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database connected');
}
module.exports = connect