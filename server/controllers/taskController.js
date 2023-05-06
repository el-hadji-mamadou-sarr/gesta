const Task = require("../models/Task");
const Tab = require("../models/Tab");


//task controller

exports.creatTask = async function (req) {
    const {tabId, name, description} = req.body;

    //recupère l'id de tab
    const tab = await Tab.findById(tabId);

    //verifie si le task est vide et envoi un erreur si oui
    if (!tab) {
        throw new Error("Tab not found");
    }

    //crée un nv task
    const newTask = new Task({name, description, tab: tabId});
    //save le task crée
    await newTask.save();

    return newTask;
};