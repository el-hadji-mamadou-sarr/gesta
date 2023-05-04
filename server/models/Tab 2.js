const mongoose = require ("mongoose");


//schema du nv tab
const tabSchema = new mongoose.Schema({
    name: String,
    createdAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model("Tab", tabSchema);
