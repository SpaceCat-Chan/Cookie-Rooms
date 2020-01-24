const socket = io.connect('http://localhost:8555');

socket.on('server-rooms', (data)=>{
    for (var i in data) {
        data[i].id = `${data[i].id[0].toUpperCase()}${data[i].id.slice(1)}`;
        document.getElementById("box-name").innerHTML += `<p><span>${data[i].id}</span></p>`;
        document.getElementById("box-worth").innerHTML += `<p><span>$${data[i].worth}</span></p>`;
        document.getElementById("box-online").innerHTML += `<p><span>${data[i].users}</span></p>`;
        document.getElementById("box-action").innerHTML += `<p><button>Join</button></p>`;
    }
});