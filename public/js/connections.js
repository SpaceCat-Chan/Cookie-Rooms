const socket = io.connect('http://localhost:8555');

var urllink = window.location.pathname;
urllink = urllink.split("/").slice(-1).join("/");

socket.emit('join-room', urllink);