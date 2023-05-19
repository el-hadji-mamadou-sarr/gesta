const Project = require("../models/Project");
const Task = require('../models/Task').Task;
const Tab = require('../models/Tab').Tab;

exports.addTask = async function (data, params, userId) {
    const {project_id, tab_id, section_id} = params;
    try {
  
    
        const project = await Project.findOne({
            _id: project_id,
            tabs: {
                $elemMatch: {
                    _id: tab_id,
                    sections: {
                        $elemMatch: {
                            _id: section_id
                        }
                    }
                }
            }
        });

        if ( !project) {
            throw new Error('nous avons pas trouvé le projet');
        }

        const task = new Task({
            name: data.name,
            description: data.description,
            due_date: data.due_date,
            created_by: userId,
            assigned_to: data.assigned_to
        });

        const filter = {
            _id: project_id,
            'tabs._id': tab_id,
            'tabs.sections._id': section_id
        };

        const update = {
            $push: {
                'tabs.$[tab].sections.$[section].tasks': task
            }
        };

        const options = {
            arrayFilters: [
                { 'tab._id': tab_id },
                { 'section._id': section_id }
            ]
        };

        await Project.updateOne(filter, update, options);

    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
};


exports.deleteTask = async function (project_id, tab_id, section_id, task_id){
    try {
        const result = await Project.updateOne(
            {
                _id: project_id,
                'tabs._id': tab_id,
                'tabs.sections._id': section_id
            },
            {
                $pull: {
                    'tabs.$[tab].sections.$[section].tasks': {
                        _id: task_id
                    }
                }
            },
            {
                arrayFilters: [
                    { 'tab._id': tab_id },
                    { 'section._id': section_id }
                ]
            }
        );
        
        if (result.nModified === 0) {
            throw new Error('Task not found');
        }
    }catch(error){
        throw error;
    }
}