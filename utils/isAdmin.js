const userModel = require("./../model/user")

module.exports = async (userId) => {
    const user = await userModel.findOne({_id : userId})
    if (user.role === "user") {
        return false
    }
    return true


}