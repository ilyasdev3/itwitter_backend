require('dotenv').config()
const express = require('express')
const connect = require('./DB/connect.db')
const router = require("./routes/index")
const fileUpload = require("express-fileupload")


const app = express()
const port = process.env.PORT


app.use(fileUpload({useTempFiles: true}));
app.use(express.json())


app.use('/api', router)



app.listen((port), ()=>{

    connect()
    console.log(`server started on port ${port}`);
})


