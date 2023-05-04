const mongoose = require("mongoose");
const Tab =  require("./Tab")



const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    tabs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tab" }],
});


module.exports = mongoose.model("Project", ProjectSchema)


