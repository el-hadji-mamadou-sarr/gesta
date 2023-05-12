
const Tab = require('../models/Tab').Tab;
const Section = require('../models/Section').Section;

exports.addSection = async function (tab_id, sectionData) {
    try {
        const tab = await Tab.findById(tab_id);
        if (!tab) {
            throw new Error('Tab not found');
        }

        const section = new Section({
            name: sectionData.name
        });

        tab.sections.push(section);
        await tab.save();
        return section;
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
