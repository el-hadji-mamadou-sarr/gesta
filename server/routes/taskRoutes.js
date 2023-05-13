
const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const getId = require('../utils/getIdFromToken');

router.post('/add', async (req, res) => {
    const userId = getId(req);

    try {
        const task = await taskController.addTask(req.body, userId);
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
