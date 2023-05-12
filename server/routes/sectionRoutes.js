
const express = require('express');
const sectionController = require('../controllers/sectionController');
const router = express.Router();
const getId = require('../utils/getIdFromToken');

router.post('/tab/:tab_id/section/add', async (req, res) => {
    try {
        const section = await sectionController.addSection(req.params.tab_id, req.body);
        res.status(201).json({ message: 'Section added successfully', section });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/tab/:tab_id/section/:section_id/task/add', async (req, res) => {
    const userId = getId(req);
    try {
        const task = await sectionController.addTaskToSection(req.params.tab_id, req.params.section_id, req.body, userId);
        res.status(201).json({ message: 'Task added to section successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
