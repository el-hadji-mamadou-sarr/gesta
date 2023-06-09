const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
        user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'users', required:true},
        token: {type: String, required: true, unique: true },
        type:{type: String, required:true},
        token_expiry:{type:Date, default:()=> new Date(Date.now() + 10*60*1000) }
});
TokenSchema.index({ token_expiry: 1 }, { expireAfterSeconds: 0 });
const SecurityResetToken = mongoose.model("security_reset_tokens", TokenSchema);
module.exports = SecurityResetToken;