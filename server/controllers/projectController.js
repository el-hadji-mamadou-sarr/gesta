const Project = require("../models/Project");
const User = require('../models/User');
const sendVerification = require("../utils/sendSecurityVerificationEmail");
const ObjectId = require('mongodb').ObjectID;

exports.createProject = async (data, user_id) => {

    try {
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

exports.getProject = async (id) => {
    try {
        const project = await Project.findById(id);

        if (!project) {
            throw new Error("Project not found");
        }
        return project;
    }
    catch (error) {
        throw error;
    }
};

exports.getProjectByOwner = async (ownerId) => {
    try {
        const project = await Project.find({ owner: ObjectId(ownerId) });
        return project;
    }
    catch (error) {
        throw error;
    }
};

exports.addMember = async (project_id, email) => {

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        }
        const project = await Project.findById(project_id);
        if (!project) {
            throw new Error("Project not found");
        }
        if (project.members.includes(user._id)) {
            throw new Error("User is already a member of the project");
        }

        project.members.push(user._id);
        user.projects.push(project_id);
        await user.save();
        await project.save();

    } catch (error) {
        throw error;
    }

}


//met à jour le projet dans la bdd et
//et envoi un mail à tout les membre du projets pour leurs informer

exports.updateProjectAndNotify = async (req, res) => {
    const projetId = req.params.project_id; //recupère l'id de projet de la requete
    const updateData = req.body; //recupère les infos de la mise à jour de la requete

    try {
        //mettre à jour le projet  dans la bdd
        let project = await Project.findByIdAndUpdate(projetId, updateData, { new: true });

        //pour chanque membre  du projet, ont envoi un notif mpar email
        for (let memberId of project.members) {
            let member = await User.findById(memberId);
            let subject = "Mise à jour du projet";
            let message = `Le projet ${project.name} à été mis à jour. Connectez-vous pour voir les détails`

            //envoi l'email à chaque membre
            sendVerification(member.email, member.fullname, subject, message);
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du projet et de l'envoi de notifications", error: error.message })
    }


}
