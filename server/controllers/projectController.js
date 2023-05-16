const Project = require("../models/Project");


exports.createProject = async (data) =>{

    try{
        const project = await Project.create(data);
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