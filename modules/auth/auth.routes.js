const express = require('express');
const userController = require("./auth.controller")

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);




module.exports = router