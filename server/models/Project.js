const mongoose = require("mongoose");
const TabSchema = require('./Tab').TabSchema;
const MessageSchema = require('./Message').MessageSchema;

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    tabs: [TabSchema],
    messages: [MessageSchema]
});


const Project = mongoose.model("projects", ProjectSchema);
module.exports = Project;
