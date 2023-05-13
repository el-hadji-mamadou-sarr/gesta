const mongoose = require('mongoose');
const TaskSchema = require('./Task').TaskSchema;

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true},
    task: [TaskSchema],
    created_at: { type: Date, default: Date.now }
});

const Section = mongoose.model("sections", SectionSchema);
module.exports = {SectionSchema, Section};
