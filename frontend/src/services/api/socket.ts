import io, { Socket } from "socket.io-client";
import { Message } from "../../models/message";

const ENDPOINT = "http://localhost:3131";

let socket: Socket;

export function initiateSocket(
  userId: string,
  roomId: string,
  cb: (error: any) => void
) {
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

export function subscribeToChat(cb: (message: Message) => void) {
  if (!socket) return;

  socket.on("message", (msg) => {
    console.log("received a message");
    cb(msg);
  });
}

type SendMessageArgs = {
  userId: string;
  roomId: string;
  content: string;
};

export function sendMessage(
  { userId, roomId, content }: SendMessageArgs,
  cb: (error: any, message: Message) => void
) {
  if (!socket) return;

  socket.emit("sendMessage", { userId, roomId, content }, cb);
}
