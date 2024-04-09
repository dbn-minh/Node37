const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("fe-join-room", (roomId) => {
    // xoa room join truoc do
    socket.rooms.forEach((roomId) => socket.leave(roomId));
    socket.join(roomId);
  });

  socket.on("fe-send-mess", (data) => {
    io.to(data.roomId).emit("be-send-mess", data);
  });

  socket.on("disconnect", (reason) => {
    // console.log(socket.id, reason)
  });
});

httpServer.listen(8080);
