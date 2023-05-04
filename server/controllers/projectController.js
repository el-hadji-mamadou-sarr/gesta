const Project = require("../models/Project");


exports.createProject = async (data) =>{

    try{
        const project = await Project.create(data);
    }
    catch (error) {
        throw error; 
    }
};