const express = require('express');
const app = express();
const route = require('../src/routes/route')
app.use(express.json());
// app.use(express.urlencoded({extended:true}))

const mongoose = require('mongoose')

require('dotenv').config();

const {PORT , MONGODB_CONNECT} = process.env;

// mongoose.set('strictQuery' , true);

mongoose.connect(
    MONGODB_CONNECT ,
    { useNewUrlParser : true }
)
.then(()=>{
    console.log("Server Connected with MongoDb")
})
.catch((error)=>{
    console.log("Error in connection", error.message)
})

app.use('/',route);

app.listen(PORT , ()=>{
    console.log(`Server running at ${PORT}`)
})
