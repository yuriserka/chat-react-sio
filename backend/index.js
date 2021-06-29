const cors = require("cors");
const router = require("./router");
const app = require("express")();
const { v4 } = require("uuid");

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());
const usersFunctions = require("./user");

const createMessage = ({ username, text }) => ({ id: v4(), username, text });

process.on("warning", (e) => console.warn(e.stack));

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, cb) => {
    try {
      const user = usersFunctions.add({ id: socket.id, username, room });

      socket.emit(
        "message",
        createMessage({
          username: "admin",
          text: `${user.name}, welcome to the room ${user.room}!`,
        })
      );
      socket.broadcast.to(user.room).emit(
        "message",
        createMessage({
          username: "admin",
          text: `${user.name}, has joined!`,
        })
      );

      socket.join(user.room);

      console.log(`${username} connected to chat: ${room}`);
      cb(null);
    } catch (error) {
      cb({ message: error.message });
    }
  });

  socket.on("sendMessage", (message, cb) => {
    const user = usersFunctions.get(socket.id);

    io.to(user.room).emit(
      "message",
      createMessage({ username: user.name, text: message })
    );
    cb();
  });

  socket.on("disconnect", () => {
    const user = usersFunctions.remove(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        createMessage({
          username: "admin",
          text: `${user.name} has left!`,
        })
      );
      console.log(`${user.name} disconnected`);
    }
  });
});

app.use(router);

server.listen(3131, () => console.log("server running"));
