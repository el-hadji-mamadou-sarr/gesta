const Tab = require("../models/Tab");
const Project = require("../models/Project");



exports.createTab = async function (req, res) {
    console.log("Request body in controller:", req.body);
r
    const { projectId, name } = req.body;


    // Trouve le projet lié à l'ID du projet
    const project = await Project.findById(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    // Crée un nouvel onglet
    const newTab = new Tab({ name });

    // ajoute l'onglet au projet
    project.tabs.push(newTab);
    await project.save();

    // sauvegarde l'onglet
    await newTab.save();

    return newTab;
}
