import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors: ['http://localhost:5173']
})

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//store online users
const userSocketMap = {};

io.on('connection', (socket) => {
    // console.log(' A user connected ',socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    //io.emit is used to send events to all connected clients
    io.emit('onlineUsers',Object.keys(userSocketMap));
    // to tell everyone that a user has connected and is online

    socket.on('disconnect', () => {
        // console.log('A user disconnected',socket.id);
        // to tell everyone that a user has connected and is online
        delete userSocketMap[userId];
        io.emit('onlineUsers',Object.keys(userSocketMap));
        
    })
})

export { io,server,app};
