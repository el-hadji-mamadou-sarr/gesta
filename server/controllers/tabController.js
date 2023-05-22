const Project = require("../models/Project");
const TabModel = require('../models/Tab').Tab;
const mongoose = require('mongoose');

exports.createTab = async function (project_id, data, user_id) {

    try {
        const project = await Project.findById(project_id);
        if (!project) {
            throw new Error("Project not found");
        }
        const tab = new TabModel({
            name: data.name,
            description: data.description,
            created_by: new mongoose.Types.ObjectId(user_id)
        });

        project.tabs.push(tab);
        project.update_at = Date.now();
        project.save();
        return tab;

    } catch (error) {
        console.log("Error:", error);
        throw new Error("le serveur a rencontré un projet");
    }
}

exports.getTab = async function (project_id, tab_id) {
    try {
        const project = await Project.findById(project_id);

        if (!project) {
            throw new Error("Project not found");
        }

        const tab = project.tabs.id(tab_id);
        if (!tab) {
            throw new Error("Tab not found");
        }
        return tab;
     
    } catch (error) {
                    
        throw new Error("le serveur a rencontré un projet");
    }
}

