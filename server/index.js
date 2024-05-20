const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();

const io = new Server({ cors: true });
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
    socket.emit("user-joined", { emailId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

io.listen(8001);
