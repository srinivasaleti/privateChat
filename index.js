var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("connection");

  socket.on("subscribe", function(room) {
    socket.join(room);
  });

  socket.on("send message", function(data) {
    console.log("sending room post", data.room);
    socket.broadcast.to(data.room).emit("conversation private post", {
      message: data.message,
      name: data.name
    });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
