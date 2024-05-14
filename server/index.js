const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server();
const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();

io.on("connection", (socket) => {
  console.log("a new user connection");
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log(`user ${emailId} joined`);
    emailToSocketMapping.set(emailId, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

io.listen(8001);
