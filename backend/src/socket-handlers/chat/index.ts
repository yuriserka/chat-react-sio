import { Socket } from "socket.io";
import { onJoin, onSendMessage, onDelete } from "./functions";

export function ChatSocketHandler(socket: Socket) {
  socket.on("join", (args, cb) => onJoin(socket, args, cb));
  socket.on("sendMessage", (args, cb) => onSendMessage(socket, args, cb));
  socket.on("delete", (args, cb) => onDelete(socket, args, cb));
}
