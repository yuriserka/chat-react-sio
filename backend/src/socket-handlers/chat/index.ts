import { Socket } from "socket.io";
import { onInit, onJoin, onLeave, onNewRoom, onSendMessage } from "./functions";

export function ChatSocketHandler(socket: Socket) {
  socket.on("init-connection", (args, cb) => onInit(socket, args, cb));
  socket.on("join", (args, cb) => onJoin(socket, args, cb));
  socket.on("leave", (args, cb) => onLeave(socket, args, cb));
  socket.on("send-message", (args, cb) => onSendMessage(socket, args, cb));
  socket.on("new-room", (args, cb) => onNewRoom(socket, args, cb));
}
