const mongoose =  require ("mongoose");

const TaskSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String },
    status: {type: String, default: "pending"},
    created_at:{type: Date, default: Date.now} ,
    tab: {type: mongoose.Schema.Types.ObjectId, ref: "Tab", required: true}
});

module.exports = mongoose.model("Task", TaskSchema);