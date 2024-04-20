const yup = require("yup")

const phoneRegExp = /^(\+98|0)?9\d{9}$/;

exports.registerValidateSchema = yup.object({
    email : yup
      .string()
      .email("please enter valid email address")
      .required("email is require"),
    
    phoneNumber : yup
    .string()
    .matches(phoneRegExp, "phoneNumber is not valid")
    .required("phoneNumber is required"),

    username : yup
      .string()
      .min(3,"name minimum 3 chracters")
      .required("username is required"),

    password : yup
      .string()
      .min(8,"password minimum 8 chracters")
      .required("password is required"),
})
exports.loginValidateSchema = yup.object({
  username : yup
    .string()
    .min(3,"name minimum 3 chracters")
    .required("username is require"),
  
  password : yup
    .string()
    .min(8,"password minimum 8 chracters")
    .required("password is required"),
})




