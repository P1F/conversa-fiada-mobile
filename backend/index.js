const express = require("express");
const socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = 5001;

io.on("connection", socket => {
    console.log("new user connected");

    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    })
})

server.listen(port, () => console.log("server running on port " + port));