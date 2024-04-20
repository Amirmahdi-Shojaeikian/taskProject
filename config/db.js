const mongoose = require('mongoose');
require("dotenv").config();


const dbUrl = process.env.MONGO_URI

mongoose
    .connect(dbUrl)
    .then(()=>console.log("Server Connected To DB Successfully"))
    .catch((err)=>console.log("err =>",err))
