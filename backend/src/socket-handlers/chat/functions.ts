import { Socket } from "socket.io";
import {
  createAdminMessage,
  createMessage,
} from "../../services/message.services";
import { FindOrCreateRoom } from "../../services/room.services";
import {
  deleteUser,
  findUserById,
  joinUserInRoom,
} from "../../services/user.services";

type JoinPayload = {
  user: {
    username: string;
    password: string;
    nickname: string;
  };
  room: string;
};

export async function onJoin(
  socket: Socket,
  payload: JoinPayload,
  cb: Function
) {
  try {
    const room = await FindOrCreateRoom(payload.room);
    const user = await joinUserInRoom({
      ...payload.user,
      rooms: {
        connect: {
          id: room.id,
        },
      },
    });

    socket.emit(
      "message",
      createAdminMessage(
        `${user.username}, welcome to the room ${payload.room}!`
      )
    );

    socket.broadcast
      .to(room.id)
      .emit("message", createAdminMessage(`${user.nickname}, has joined!`));

    socket.join(room.id);

    console.log(`${payload.user.username} connected to chat: ${payload.room}`);
    cb(null);
  } catch (error) {
    cb({ message: error.message });
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

  user &&
    room &&
    socket.to(room.id).emit(
      "message",
      createMessage({
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
      })
    );
  cb();
}

type DisconnectPayload = {
  userId: string;
  roomId: string;
};

export async function onDelete(
  socket: Socket,
  payload: DisconnectPayload,
  cb: Function
) {
  const user = await deleteUser(payload.userId);
  if (user) {
    socket
      .to(payload.roomId)
      .emit("message", createAdminMessage(`${user.nickname} has left!`));
    console.log(`${user.username} disconnected`);
    cb();
  }
}
