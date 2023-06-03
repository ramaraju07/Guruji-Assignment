const express = require('express');
const router = express.Router();
const {
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../../controllers/todo/todo.controller');

router.route('/getTask').get(getTask);
router.route('/createTask').post(createTask);
router.route('/updateTask/:id').put(updateTask);
router.route('/deleteTask/:id').delete(deleteTask);

module.exports = router;
