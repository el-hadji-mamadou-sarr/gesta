const Project = require("../models/Project");
const User = require('../models/User');

exports.createProject = async (data, user_id) =>{

    try{
        const project = await Project.create(data);
        project.members.push(user_id);

        const user = await User.findById(user_id);
        user.projects.push(project._id);

        await user.save();
        await project.save();
        
        return project;
    }
    catch (error) {
        throw error; 
    }
};

exports.getProject = async (id) =>{
    try{
        const project = await Project.findById(id);

        if(!project){
            throw new Error("Project not found");
        } 
        return project;
    }
    catch (error) {
        throw error;
    }
};