import { Message } from "@models/message";
import { Room } from "@models/room";
import io, { Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:3131";

let socket: Socket;

export function emitEventInitSocket(cb: (socket: Socket, error: any) => void) {
  console.log("Connecting socket...");

  socket = io(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  socket.emit("init-connection", null, cb);
}

export function emitEventJoinRoom(
  userId: string,
  roomId: string,
  cb: (error: any) => void
) {
  if (socket && roomId) {
    socket.emit("join", { userId, roomId }, cb);
    console.log(`joined room: ${roomId}`);
  }
}

export function emitEventDisconnect() {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
}

export function ListenToOnMessageEvent(cb: (message: Message) => void) {
  if (!socket) return;

  socket.on("message", cb);
}

type SendMessageArgs = {
  userId: string;
  roomId: string;
  content: string;
};

export function emitEventSendMessage(
  { userId, roomId, content }: SendMessageArgs,
  cb: (error: any, message: Message) => void
) {
  if (!socket) return;

  socket.emit("send-message", { userId, roomId, content }, cb);
}

type NewRoomArgs = {
  userId: string;
  name: string;
};

export function emitEventNewRoom(
  { name, userId }: NewRoomArgs,
  cb: (error: any, room: Room) => void
) {
  if (!socket) return;

  socket.emit("new-room", { name, userId }, cb);
}

type LeaveArgs = {
  userId: string;
  roomId: string;
};

export function emitEventLeaveChat(
  { roomId, userId }: LeaveArgs,
  cb: (error: any) => void
) {
  if (!socket) return;

  socket.emit("leave", { roomId, userId }, cb);
}
