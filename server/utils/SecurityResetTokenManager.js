const mongoose = require('mongoose');
const SecurityResetToken = require('../models/SecurityResetToken');
const bcrypt = require('bcrypt');
async function saveResetToken (id, resetToken, type){
        try{
                await SecurityResetToken.create({
                        user_id: id,
                        token: await bcrypt.hash(resetToken, 10),
                        type: type,
                });
        }catch(error){
                throw error
        }
}
module.exports = {saveResetToken}