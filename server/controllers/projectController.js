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

exports.addMember =  async (project_id, email)=>{
    
    try{
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("User not found");
        }
        const project = await Project.findById(project_id);
        if(!project){
            throw new Error("Project not found");
        }
        if(project.members.includes(user._id)){
            throw new Error("User is already a member of the project");
        }

        project.members.push(user._id);
        user.projects.push(project_id);
        await user.save();
        await project.save();

    }catch(error){
        throw error;
    }
}