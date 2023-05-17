const mongoose = require('mongoose');
const Message = require('../models/Message').Message;
const Project = require("../models/Project");
const User = require("../models/User");

/**
 * 
 * send a message to users who joined the room 
 * 
 * The client have to join the room first with the event
 * 
 * @event 'join' the client have to emit this event to join the room with the project_id
 * @param {project_id}  project_id the id of the current project: we use it for the project room
 * 
 * 
 * @event 'message' the client have to emit this event to send messages to all users
 * @param {project_id}  project_id the id of the current project: we use it for the project room
 * @param {user_id} user_id the current user who is sending the message
 * @param {message} message the message we want to send
 * 
 * 
 *
 */
function  message (io, Socket){
        Socket.on('join', (project_id)=>{
                Socket.join(project_id);
                
        })      

        Socket.on('message', async (data)=>{  
                
                const project = await Project.findById(data.project_id);
                const user = await User.findById(data.user_id);
                
                if(project && user){
                        
                        io.to(data.project_id).emit('message', data);
                        const message = new Message({
                                user_id: new mongoose.Types.ObjectId(data.user_id),
                                message: data.message,
                        })
                        project.messages.push(message);
                        project.save();
                        
                }
        })
}

module.exports = message;