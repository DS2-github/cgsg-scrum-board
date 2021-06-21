const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8000;               

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`); 
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });            
});

server.listen(port, () => {
    console.log("Server listening");
})
