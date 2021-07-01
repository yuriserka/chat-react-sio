import io from "socket.io-client";

const ENDPOINT = "http://localhost:3131";

const socket = io(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

export function initiateSocket(username, room, cb) {
  console.log("Connecting socket...");
  if (socket && room) {
    socket.emit(
      "join",
      {
        user: {
          username,
          password: "123",
          nickname: `${username}-nickname`,
        },
        room,
      },
      cb
    );
    console.log(`joined room: ${room}`);
  }
}

export function disconnectSocket() {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
}

export function subscribeToChat(cb) {
  if (!socket) return;

  socket.on("message", (msg) => {
    cb(msg);
  });
}

export function sendMessage(message, cb) {
  if (!socket) return;

  socket.emit("sendMessage", message, cb);
}
