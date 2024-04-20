const userModel = require("./../../model/user");
const bcrypt =require("bcryptjs")
const {registerValidateSchema,loginValidateSchema} = require("./auth.validate");
const isAdmin = require("../../utils/isAdmin")

exports.register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    await registerValidateSchema.validate(
      { email, username, phoneNumber, password },
      {
        abortEarly: false,
      }
    ).then(function (valid) {
        console.log(valid); 
      })
      .catch(function (error) {
          console.log(error.errors[0]);
    });

    const userExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (userExist) {
      return res.status(409).json({
        message: "There is an existing user with this email or username",
      });
    }
    const firsUser = (await userModel.countDocuments()) === 0;
    let role = "user";
    if (firsUser) {
      role = "admin";
    }
    const user = await userModel.create({
      email,
      username,
      password,
      phoneNumber,
      role,
    });
    
    const findUser = await userModel.findOne({username },"-password");
    return res.status(201).json({
      message: "user created successfully",
      user : findUser 
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validation = loginValidateSchema.validate(
      { username, password },
      {
        abortEarly: false,
      }
    ).then(function (valid) {
        console.log(valid); 
      })
      .catch(function (error) {
          console.log(error.errors[0]);
    });

    const isUser = await userModel.findOne({username})
    if (!isUser) {
        return res.status(404).json({
            message : "User not found",
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,isUser.password)
    if(!isPasswordMatch) {
        return res.status(401).json({
            message : "Password or username do not match"
        })
    }

    return res.status(200).json({
        message : "login successfully"
    })

  } catch (error) {
    console.log("error", error);

  }
};













