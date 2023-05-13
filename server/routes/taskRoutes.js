
const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const getId = require('../utils/getIdFromToken');

router.post('/:project_id/:tab_id/:section_id/add', async (req, res) => {
    const userId = getId(req);

    try {
       await taskController.addTask(req.body, req.params,  userId);
        res.status(201).json({ message: 'Task added successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
