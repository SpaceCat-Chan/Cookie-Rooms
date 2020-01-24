//Server settings
const SERVER_PORT = 8555;

//Config settings
let server_rooms = [];

const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port ${SERVER_PORT}`);
});

const io = socket(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/:room', function (req, res) {
    var exists = false;
    for (var i in server_rooms) {
        if (req.params.room.toLowerCase() == server_rooms[i].id) {
            exists = true;
        }
    }
    if (exists == true || req.params.room.toLowerCase() == "favicon.ico") {
        res.sendFile(__dirname + '/public/templates/room.html');
    }
    else {
        server_rooms.push(new Newroom(req.params.room.toLowerCase()));
        res.send("<h1>Room created</h1>");
    }
});


io.on('connection', (socket)=>{
    console.log(`${socket.id} has connected`);
    socket.emit('server-rooms', server_rooms);

});

/*setInterval(function(){
    for (var i in server_rooms) {
        server_rooms[i].users = io.sockets.clients(server_rooms[i].id);
    }
}, 5000);*/

//All of the servers classes ->>

function Newroom(id) {
    this.id = id;
    this.worth = 0;
    this.users = 0;
}