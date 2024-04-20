const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const schema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phoneNumber : {
        type : String,
        unique : true,
        required : true,
    },
    profile : {
        type : String,
        default : "",
        required : false,
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user",
        required : true,
    }
},{timestamps:true})


schema.pre("save" , function(){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
})
schema.pre("update" , function(){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
})


const model = mongoose.model("User",new mongoose.Schema(schema))

module.exports = model