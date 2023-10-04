const io = require('socket.io')(3000);
const users = {};
const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', users['socket.id']);
        delete users[socket.id];
    });
});
