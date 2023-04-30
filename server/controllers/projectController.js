const Project = require("../models/Project");


exports.createProject = async (data) =>{
    try{
        const newProject = new Project(data);
        await newProject.save();
        return newProject;
    }
    catch (error) {
        throw error; 
    }
};