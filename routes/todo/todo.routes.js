const express = require('express');
const router = express.Router();
const {
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../../controllers/todo/todo.controller');
const { protect, admin } = require('../../middlewares/auth.middleware');

router.route('/getTask').get(protect, getTask);
router.route('/createTask').post(protect, createTask);
router.route('/updateTask/:id').put(protect, updateTask);
router.route('/deleteTask/:id').delete(protect, admin, deleteTask);

module.exports = router;
