let express = require('express');
let app = express();

let server = require('http').createServer(app);

let io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('server running');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', socket => {

    connections.push(socket);
    console.log('Sockets connected: %s', connections.length);

    // Disconect
    socket.on('disconnect', data => {
        users.splice(users.indexOf(socket.username), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket(s) connected', connections.length);
    });

    // Send message
    socket.on('send message', data => {
        console.log(data);
        io.sockets.emit('new message', {msg: data, user: socket.username});
    })

    // New message
    socket.on('new user', (data, callback) => {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUserNames();
    });

    function updateUserNames() {
        io.sockets.emit('get users', users);
    }

})


