const express = require ("express");
const taskController = require ("../controllers/taskController");
const router = express.Router();


router.post("/create" , async (req, res) => {

    try {
        const newTask = await taskController.creatTask(req);
        res.status(201).json(newTask);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }


});

module.exports = router;