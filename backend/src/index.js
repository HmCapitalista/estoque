require('dotenv/config');

const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const http = require('http');
const serverIo = require('socket.io');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/estoque/build')));
app.use(routes);

const server = http.createServer(app);

const io = serverIo(server);

io.on('connection', (socket) => {
    socket.on('reloadEmit', () => {
        socket.broadcast.emit('reload');
    });
})

console.log("Application is running in port: " + String(port));
server.listen(port);