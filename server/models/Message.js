const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
        user_id : { type: mongoose.Schema.Types.ObjectId, require:true },
        message : { type: String, require: true},
        created_at : {type: Date, default: Date.now} 
});

const Message = mongoose.model('messages', MessageSchema);
module.exports = {MessageSchema, Message};