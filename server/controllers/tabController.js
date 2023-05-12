const Project = require("../models/Project");
const TabModel = require('../models/Tab').Tab;
const mongoose = require('mongoose');

exports.createTab = async function (data, user_id) {

    try {
        console.log("Searching for project with ID:", data.project_id);
        const project = await Project.findById(data.project_id);
        if (!project) {
            throw new Error("Project not found");
        }
        console.log("Project found");

        const tab = new TabModel({
            name: data.name,
            description: data.description,
            created_by: new mongoose.Types.ObjectId(user_id)
        });

        project.tabs.push(tab);
        project.update_at = Date.now();
        project.save();
        console.log("Tab saved");
        return tab;

    } catch (error) {
        console.log("Error:", error);
        throw new Error("le serveur a rencontré un projet");
    }


}
