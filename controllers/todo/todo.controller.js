const asyncHandler = require('express-async-handler');
const Task = require('../../model/Task');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');

const getTask = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies?.jwt, process.env.JWT_SECRET);
  const task = await Task.find({ user: decoded.userId });
  if (task) {
    res.send({
      success: true,
      task
    });
  } else {
    res.status(400);
    throw new Error('No Task found');
  }
});

const createTask = asyncHandler(async (req, res) => {
  try {
    const { taskName, description, status } = req.body;
    const decoded = jwt.verify(req.cookies?.jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    const task = await Task.create({
      taskName,
      description,
      status,
      user
    });

    if (task) {
      res.send({
        success: true,
        task
      });
    } else {
      res.status(400);
      throw new Error(`Enter task details properly`);
    }
  } catch (error) {
    res.status(400);
    throw new Error(`Enter task details properly`);
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, update, { new: true });

    if (task) {
      res.send({
        success: true,
        task
      });
    } else {
      res.status(400);
      throw new Error(`No Task found with the given id`);
    }
  } catch (err) {
    res.status(400);
    throw new Error(`No Task found with the given id`);
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndRemove(id);

    if (deleteTask) {
      res.send({
        success: true,
        deletedTask
      });
    } else {
      res.status(400);
      throw new Error(`Cannot find Task`);
    }
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't find task with the given id`);
  }
});

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask
};
