import io from "socket.io-client";

const ENDPOINT = "http://localhost:3131";

let socket;

export function initiateSocket(userId, roomId, cb) {
  console.log("Connecting socket...");

  socket = io(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  if (socket && roomId) {
    socket.emit("join", { userId, roomId }, cb);
    console.log(`joined room: ${roomId}`);
  }
}

export function disconnectSocket() {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
}

export function subscribeToChat(cb) {
  if (!socket) return;

  socket.on("message", (msg) => {
    console.log("received a message");
    cb(msg);
  });
}

export function sendMessage({ userId, roomId, content }, cb) {
  if (!socket) return;

  socket.emit(
    "sendMessage",
    {
      userId,
      roomId,
      content,
    },
    cb
  );
}
