const userModel = require("./../../model/user");
const taskModel = require("./../../model/task");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  try {
    const { userID } = req.params;
    const { title, description } = req.body;
    if (mongoose.Types.ObjectId.isValid(userID)) {
      const isUser = await userModel.findOne({ _id: userID });
      if (isUser) {
        const task = await taskModel.create({
          title,
          description,
          files: req.file.filename,
          user: userID,
        });
        return res.status(201).json({
          message: "Task created successfully",
          task,
        });
      }
      return res.status(404).json({
        message: "user not found",
      });
    }
    return res.status(404).json({
      message: "Id is not valid",
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { userID } = req.params;
    if (mongoose.Types.ObjectId.isValid(userID)) {
      const isUser = await userModel.findOne({ _id: userID });
      if (isUser) {
        const allTask = await taskModel.find({ user: userID }).lean();
        const countTask = await taskModel.find({ user: userID }).countDocuments();
        console.log(countTask);
        return res.status(200).json({
            allTask,
            countTask
        });
      }
      return res.status(404).json({
        message: "user not found",
      });
    }
    return res.status(404).json({
      message: "Id is not valid",
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { taskID } = req.params;
    if (mongoose.Types.ObjectId.isValid(taskID)) {
      const isTask = await taskModel.findOne({ _id: taskID });
      if (isTask) {
        const task = await taskModel.findOne({ _id: taskID }).lean();
        return res.status(200).json(task);
      }
      return res.status(404).json({
        message: "user not found",
      });
    }
    return res.status(404).json({
      message: "Id is not valid",
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskID } = req.params;
    if (mongoose.Types.ObjectId.isValid(taskID)) {
      const task = await taskModel.findOneAndDelete({ _id: taskID }).lean();
      return res.status(200).json({
        message: "Task deleted",
        task,
      });
    }
    return res.status(404).json({
      message: "Id is not valid",
    });
  } catch (error) {
    console.log("error", error);
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { taskID } = req.params;
    const { title, description } = req.body;
    if (mongoose.Types.ObjectId.isValid(taskID)) {
      if (req.file) {
        const task = await taskModel
          .findOneAndUpdate(
            { _id: taskID },
            {
              title,
              description,
              files: req.file.filename,
            }
          )
          .lean();
        return res.status(200).json(task);
      }
      const task = await taskModel
        .findOneAndUpdate(
          { _id: taskID },
          {
            title,
            description,
          }
        )
        .lean();
      return res.status(200).json(task);
    }
    return res.status(404).json({
      message: "Id is not valid",
    });
  } catch (error) {
    console.log("error", error);
  }
};
