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

