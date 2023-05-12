const Project = require("../models/Project");
const Task = require('../models/Task').Task;
const Tab = require('../models/Tab').Tab;

exports.createTask = async function (data, userId) {
    try {
        //recherche d'abord le projet dont l'id du tab y figure
        const project = await Project.findOne({ "tabs._id": data.tab_id });
        if (!project) {
            throw new Error('Project not found');
        }
        
        const tab = project.tabs.id(data.tab_id);
        if (!tab) {
            throw new Error('Tab not found');
        }

        console.log("Tab found");

        const task = new Task({
            name: data.name,
            description: data.description,
            due_date: data.due_date,
            created_by: userId,
            assigned_to: data.assigned_to
        });

        tab.tasks.push(task);
        await project.save();
        await task.save();

        return task;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
};
