const Project = require("../models/Project");
const TabModel = require('../models/Tab').Tab;
const mongoose = require('mongoose');

exports.createTab = async function (data, user_id) {

    try{
         const project = await Project.findById(data.project_id);
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

    }catch(error){
        throw new Error("le serveur a rencontré un projet");
    }
   

}
