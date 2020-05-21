const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 80;
const routes = require('./routes');
const http = require('http');
const serverIo = require('socket.io');
let requesds = [];

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use(routes);

const server = http.createServer(app);

const io = serverIo(server);

io.on('connection', socket => {
    socket.emit('requests', requesds);

    socket.on('reloadEmit', () => {
        socket.broadcast.emit('reload');
    });

    socket.on('request', requests => {
        socket.broadcast.emit('requests', requests);
        requesds = requests;
    });

    socket.on('requestComplete', (requests, accountId) => {
        io.emit('requests', requests, accountId);
        requesds = requests;
    });

    socket.on('requestsRequest', () => {
        socket.emit('requests', requesds);
    });

});

console.log("Application is running in port: " + String(port));
server.listen(port);