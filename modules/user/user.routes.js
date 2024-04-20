const express = require("express");
const userController = require("./user.controller");
const uploader = require("./../../middleware/multer");

const router = express.Router();

router
  .route("/edit-profile")
  .put(uploader.single("cover"), userController.updateProfile);
router
  .route("/:userID")
  .get(userController.getAll)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
