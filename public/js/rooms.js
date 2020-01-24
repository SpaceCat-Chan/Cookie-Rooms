const socket = io.connect('http://localhost:8555');

socket.on('server-rooms', (data)=>{
    for (var i in data) {
        console.log(data[i].id);
    }
});