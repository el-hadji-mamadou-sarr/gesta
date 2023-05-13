function message(io, Socket){
        Socket.on('join', (room)=>{
                Socket.join(room);
        })      

        Socket.on('message', (data)=>{  
                io.to(data.room).emit('message', data);
        })

}
module.exports = message;