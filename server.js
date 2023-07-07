const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const ws = socketIO(server);

console.log(path.resolve("index.html"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

ws.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("new message", msg);
  });

  socket.on("user joined", (username) => {
    socket.broadcast.emit("new user", username);
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
