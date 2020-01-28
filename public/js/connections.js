const socket = io.connect("http://localhost:8555");

var urllink = window.location.pathname;
urllink = urllink
    .split("/")
    .slice(-1)
    .join("/");

socket.emit("join-room", urllink);

socket.on("disconnect", data => {
    delete players[data];
});

function realtimeUpdate() {
    socket.emit("playerpos", {
        x: mouseX,
        y: mouseY,
        screenW: window.innerWidth,
        screenH: window.innerHeight,
        room: urllink
    });
}

socket.on("playerpos", data => {
    var percentagePosX = data.x / data.screenW;
    var percentagePosY = data.y / data.screenH;
    data.x = window.innerWidth * percentagePosX;
    data.y = window.innerHeight * percentagePosY;

    if (!players[data.socket]) {
        players[data.socket] = new Player(data.x, data.y);
    }
    players[data.socket].pos.x = data.x;
    players[data.socket].pos.y = data.y;
});

function mousePressed() {
    if (dist(mouseX, mouseY, cookie.pos.x, cookie.pos.y) < cookie.radius / 2) {
        socket.emit("cookie-click");
    }
}

socket.on("room-data", data => {
    cookie.worth = data.worth;
});
