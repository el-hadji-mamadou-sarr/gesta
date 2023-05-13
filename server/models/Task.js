const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    due_date: {type: Date},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    assigned_to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    created_at: {type: Date, default: Date.now},
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports = {TaskSchema, Task};