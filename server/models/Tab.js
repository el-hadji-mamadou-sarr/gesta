const mongoose = require ("mongoose");
const SectionSchema = require('./Section').SectionSchema;
const TaskSchema = require('./Task').TaskSchema;

const TabSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required:true },
    sections: [SectionSchema], 
    tasks: [TaskSchema],
    created_at: {type: Date,  default:()=> new Date(Date.now()) },
});

const Tab = mongoose.model("tabs", TabSchema);
module.exports = {TabSchema, Tab};