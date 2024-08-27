const express = require('express');
const router = express.Router();
const Task = require("../models/task.model");

router.get("/tasks", async(req, res) =>{
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  res.status(200).json(tasks);
})

router.get('/tasks/completed', async(req, res) => {
  try {
    const completedTasks = await Task.find(task => task.isCompleted).populate('user');
  res.json(completedTasks);
  } catch (error) {
    return res.status(500).json({ message: "😓 Something went wrong" });
  }
});

router.get('/tasks/incomplete', async(req, res) => {
  try {
    const incompleteTasks = await Task.filter(task => !task.isCompleted).populate('user');
  res.json(incompleteTasks);
  } catch (error) {
    return res.status(500).json({ message: "😓 Something went wrong" });
  }
});

router.get('/tasks/:id', async (req, res) => {

  const taskId = req.params.id;
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const task = await Task.findById(taskId).populate('user');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task' });
  }
});


module.exports = router;
