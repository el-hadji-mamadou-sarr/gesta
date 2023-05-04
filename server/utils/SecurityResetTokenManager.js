const mongoose = require('mongoose');
const SecurityResetToken = require('../models/SecurityResetToken');
const crypto = require('crypto');

function hash(token){
        return crypto.createHash('sha256').update(token).digest('hex');
}

async function saveResetToken (id, resetToken, type){
        try{
                await SecurityResetToken.create({
                        user_id: id,
                        token: hash(resetToken),
                        type: type,
                });
        }catch(error){
                throw error
        }
}

async function verifyResetToken(token){
        try{
                const securityResetToken = await SecurityResetToken.findOne({token: hash(token)});
                if(!securityResetToken || new Date() > securityResetToken.token_expiry){

                        return false;
                }else{
                        return true;
                }
        }catch(error){
                throw error;
        }
}

module.exports = {saveResetToken, verifyResetToken}