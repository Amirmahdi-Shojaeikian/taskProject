const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
      },
    files : {
        type : String,
        default : "",
        required: false
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref : "User",
        required: true
    }
},{timestamps:true})

const model = mongoose.model("Task",new mongoose.Schema(schema))

module.exports = model