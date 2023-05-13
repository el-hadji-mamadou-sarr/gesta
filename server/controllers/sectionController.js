const Project = require("../models/Project");
const Tab = require('../models/Tab').Tab;
const Section = require('../models/Section').Section;

exports.addSection = async function (data, params) {
    try {
        const project = await Project.findOne({
            _id: params.project_id,
            'tabs._id': params.tab_id    
        });
      
        if ( !project) {
            throw new Error('Tab not found');
        }

        const section = new Section({
            name: data.name
        });
        await Project.updateOne(
            {_id: params.project_id,'tabs._id':params.tab_id},
            { $push: { 'tabs.$.sections': section } }
        )

    } catch (error) {
        throw error;
    }
};

exports.addTaskToSection = async function (tab_id, section_id, taskData, userId) {
    try {
        const tab = await Tab.findById(tab_id);
        if (!tab) {
            throw new Error('Tab not found');
        }

        const section = tab.sections.id(section_id);
        if (!section) {
            throw new Error('Section not found');
        }

        const task = new Task({
            ...taskData,
            created_by: userId
        });

        section.tasks.push(task);
        await tab.save();
        return task;
    } catch (error) {
        throw error;
    }
};
