import { Socket } from "socket.io";
import {
  createAdminMessage,
  createMessage,
} from "../../services/message.services";
import { findRoomById } from "../../services/room.services";
import { deleteUser, findUserById } from "../../services/user.services";

type JoinPayload = {
  userId: string;
  roomId: string;
};

export async function onJoin(
  socket: Socket,
  payload: JoinPayload,
  cb: Function
) {
  try {
    const room = await findRoomById(payload.roomId);
    const user = await findUserById(payload.userId);

    if (!room) {
      return cb({ message: "room dont exist yet" }, null);
    }

    if (!user) {
      return cb({ message: "user dont exist yet" }, null);
    }

    cb(null, room);

    socket.emit(
      "message",
      createAdminMessage(`${user?.username}, welcome to the room ${room.name}!`)
    );

    socket.broadcast
      .to(room.id)
      .emit("message", createAdminMessage(`${user?.nickname}, has joined!`));

    socket.join(room.id);
    console.log(`${user?.username} connected to chat: ${room.name}`);
  } catch (error) {
    console.error({ error });
    cb({ message: error.message }, null);
  }
}

type SendMessagePayload = {
  userId: string;
  roomId: string;
  content: string;
};

export async function onSendMessage(
  socket: Socket,
  payload: SendMessagePayload,
  cb: Function
) {
  const user = await findUserById(payload.userId);
  const room = user?.rooms.find((r) => r.id === payload.roomId);

  if (user && room) {
    const message = await createMessage({
      content: payload.content,
      author: {
        connect: {
          id: user.id,
        },
      },
      room: {
        connect: {
          id: room.id,
        },
      },
    });
    socket.to(room.id).emit("message", message);
    cb(null, message);
  } else {
    cb({ message: "user or room not found" }, null);
  }
}

type DisconnectPayload = {
  userId: string;
  roomId: string;
};

export async function onDelete(
  socket: Socket,
  payload: DisconnectPayload,
  cb?: Function
) {
  const user = await deleteUser(payload.userId);
  if (user) {
    socket
      .to(payload.roomId)
      .emit("message", createAdminMessage(`${user.nickname} has left!`));
    console.log(`${user.username} disconnected`);
    cb?.();
  }
}
