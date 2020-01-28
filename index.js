//Server settings
const SERVER_PORT = 8555;

//Config settings
let server_rooms = [];

const express = require("express");
const app = express();
const socket = require("socket.io");

const server = app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
});

const io = socket(server);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/:room", function(req, res) {
    var exists = false;
    for (var i in server_rooms) {
        if (req.params.room.toLowerCase() == server_rooms[i].id) {
            exists = true;
        }
    }
    if (exists == true || req.params.room.toLowerCase() == "favicon.ico") {
        res.sendFile(__dirname + "/public/templates/room.html");
    } else {
        server_rooms.push(new Newroom(req.params.room.toLowerCase()));
        res.send("<h1>Room created</h1>");
    }
});

io.on("connection", socket => {
    console.log(`${socket.id} has connected`);
    socket.on("server-rooms", () => {
        socket.emit("server-rooms", server_rooms);
    });

    socket.on("join-room", room => {
        socket.join(room);
        for (var i in server_rooms) {
            if (room == server_rooms[i].id) {
                server_rooms[i].users.push(socket.id);
                socket.emit("room-data", server_rooms[i]);
            }
        }
    });

    socket.on("playerpos", data => {
        data.socket = socket.id;
        socket.broadcast.to(data.room).emit("playerpos", data);
    });

    socket.on("cookie-click", () => {
        var socket_data = findSocket();
        server_rooms[socket_data.room_index].worth +=
            server_rooms[socket_data.room_index].click_income;
        io.in(socket_data.id).emit(
            "room-data",
            server_rooms[socket_data.room_index]
        );
    });

    socket.on("disconnect", () => {
        var socket_data = findSocket();
        if (socket_data) {
            io.in(socket_data.id).emit("disconnect", socket.id);
            if (server_rooms[socket_data.room_index]) {
                server_rooms[socket_data.room_index].users.splice(
                    socket_data.user_index,
                    1
                );
            }
        }
    });

    function findSocket() {
        for (var i in server_rooms) {
            for (var j in server_rooms[i].users) {
                if (socket.id == server_rooms[i].users[j]) {
                    var socket_data = {
                        id: server_rooms[i].id,
                        room_index: i,
                        user_index: j
                    };
                    return socket_data;
                }
            }
        }
    }
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
    this.users = [];
    this.click_income = 1;
}
