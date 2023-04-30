const mongoose = require("mongoose");



const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;


