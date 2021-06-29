import io from "socket.io-client";

const ENDPOINT = "http://localhost:3131";

const socket = io(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

export const initiateSocket = (username, room, cb) => {
  console.log("Connecting socket...");
  if (socket && room) {
    socket.emit("join", { username, room }, cb);
    console.log(`joined room: ${room}`);
  }
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return;

  socket.on("message", (msg) => {
    cb(msg);
  });
};

export const sendMessage = (message, cb) => {
  if (!socket) return;

  socket.emit("sendMessage", message, cb);
};
