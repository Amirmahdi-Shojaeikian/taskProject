const { default: mongoose } = require("mongoose")
const userModel = require("./../../model/user")
const taskModel = require("./../../model/task")
const isAdmin = require("./../../utils/isAdmin")


exports.getAll = async (req,res) =>{
    try {
        const {userID} = req.params
    if (mongoose.Types.ObjectId.isValid(userID)) {
        const resultIsAdmin = await isAdmin(userID)
        console.log(resultIsAdmin);
        if (resultIsAdmin) {
            const users = await userModel.find({},"-password").lean()
            return res.status(200).json(users)
        }
        return res.status(403).json({
            message : "you are not allowed to this api"
        })
    }
    return res.status(404).json({
        message : "Id is not valid"
    })
        
    } catch (error) {
        console.log("error",error);
    }
}


exports.updateUser = async (req, res) =>{
   try {
    const {userID} = req.params
    const {id,username,password,role,email,phoneNumber} = req.body
    const isUser = await userModel.findOne({_id : id})
    console.log(isUser);
    if (mongoose.Types.ObjectId.isValid(userID)) {
       if (mongoose.Types.ObjectId.isValid(id) && isUser ) {
        const resultIsAdmin = await isAdmin(userID)
        if (resultIsAdmin) {
            const users = await userModel.findOneAndUpdate({_id : id },{
                username,password,role,email,phoneNumber
            },{ new: true, select: 'username email phoneNumber role' })
            return res.status(200).json(users)
        }
        return res.status(403).json({
            message : "you are not allowed to this api"
        })
       }
       return res.status(404).json({
        message : "Id is not valid"
    })
    }
    return res.status(404).json({
        message : "userId is not valid"
    })
    
   } catch (error) {
    console.log("error",error);
   }
}

exports.deleteUser = async(req, res) => {
    try {
        const {userID} = req.params
        const {id} = req.body
        if (mongoose.Types.ObjectId.isValid(userID)) {
           if (mongoose.Types.ObjectId.isValid(id)) {
            const resultIsAdmin = await isAdmin(userID)
            if (resultIsAdmin) {
                const user = await userModel.findOneAndDelete({_id : id },
                {select: 'username email phoneNumber role' })
                if (user) {
                    const userTasks = await taskModel.deleteMany({user:id})
                    return res.status(200).json({user,userTasks})
                }
                return res.status(404).json({
                    message : "User not found",
                })

            }
            return res.status(403).json({
                message : "you are not allowed to this api"
            })
           }
           return res.status(404).json({
            message : "Id is not valid"
        })
        }
        return res.status(404).json({
            message : "userId is not valid"
        })
        
    } catch (error) {
        console.log("error",error);
    }
}

exports.updateProfile = async (req,res) => {
   try {
    const {id,email,phoneNumber,newPassword} = req.body
    if (mongoose.Types.ObjectId.isValid(id)) {

     const isUser = await userModel.findOne({_id: id})

     if (!isUser) {
         return res.status(404).json({
             message : "User not found",
         })
     }
     if (req.file) {
         const profile = req.file.filename
         const user = await userModel.findOneAndUpdate({_id : id },
         {email,phoneNumber,password:newPassword,profile},{select: 'username email phoneNumber role updatedAt cover' })
         return res.status(200).json(user)
 
     }
     const user = await userModel.findOneAndUpdate({_id : id },
         {email,phoneNumber,password:newPassword},{select: 'username email phoneNumber role updatedAt cover' })
         return res.status(200).json(user)
    }
    return res.status(404).json({
     message : "Id is not valid"
 })
 
    
   } catch (error) {
    console.log("error",error);
   }
}