const express = require("express");
const taskController = require("./task.controller");
const uploader = require("./../../middleware/multer");

const router = express.Router();

// router
//   .route("/edit-profile")
//   .put(uploader.single("cover"), userController.updateProfile);
router
  .route("/user/:userID")
  .post(uploader.single("file"), taskController.create)
  .get(taskController.getAll);

  router
  .route("/:taskID")
  .get(taskController.getOne)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);
  
module.exports = router;
