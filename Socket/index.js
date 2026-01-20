const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
    // console.log("A User is connected");

    socket.on("join", (userName) => {
        users.add(userName);
        socket.userName = userName;
        io.emit("userJoined", userName);

        io.emit("userList", Array.from(users));
    });

    socket.on("chatMessage", (message) => {
        io.emit("chatMessage", message);
    });

    socket.on("disconnect", () => {
        // console.log("user disconnected");

        if (socket.userName) {
            users.delete(socket.userName);

            io.emit("userLeft", socket.userName);
            io.emit("userList", Array.from(users));
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});
