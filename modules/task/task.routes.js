const express = require("express");
const taskController = require("./task.controller");
const uploader = require("./../../middleware/multer");

const router = express.Router();


router
  .route("/user/:userID")
  .post(uploader.single("file"), taskController.create)
  .get(taskController.getAll);

  router
  .route("/:taskID")
  .get(taskController.getOne)
  .put(uploader.single("file"),taskController.updateTask)
  .delete(taskController.deleteTask);
  
module.exports = router;
