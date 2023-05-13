const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
        user_id : { type: mongoose.Schema.Types.ObjectId, require:true },
        message : { type: String, require: true}
});

const Message = mongoose.model('messages', MessageSchema);
module.exports = {MessageSchema, Message};