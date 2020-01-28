const socket = io.connect("http://46.101.195.219:8555");

socket.emit("server-rooms");

socket.on("server-rooms", data => {
    for (var i in data) {
        data[i].id = `${data[i].id[0].toUpperCase()}${data[i].id.slice(1)}`;
        document.getElementById(
            "box-name"
        ).innerHTML += `<p><span>${data[i].id}</span></p>`;
        document.getElementById(
            "box-worth"
        ).innerHTML += `<p><span>$${data[i].worth}</span></p>`;
        document.getElementById(
            "box-online"
        ).innerHTML += `<p><span>${data[i].users.length}</span></p>`;
        document.getElementById(
            "box-action"
        ).innerHTML += `<p><button onclick="window.location.href = '${
            document.location.href
        }${data[i].id.toLowerCase()}';">Join</button></p>`;
    }
});
