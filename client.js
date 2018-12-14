var io = require("socket.io-client");
var socket = io.connect(
  "http://localhost:3000",
  { reconnect: true }
);

name = process.env.name;

socket.on("connect", function(socket) {
  console.log("Connected!");
});

socket.emit("subscribe", process.env.id);

socket.on("conversation private post", function(data) {
  console.log(data.name + ":: " + data.message + "\n");
});

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
  socket.emit("send message", {
    room: process.env.id,
    name: name,
    message: d.toString().trim()
  });
});
