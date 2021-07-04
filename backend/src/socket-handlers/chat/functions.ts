import { Socket } from "socket.io";
import { createMessage } from "../../services/message.services";
import { FindOrCreateRoom, findRoomById } from "../../services/room.services";
import { findUserById } from "../../services/user.services";

export async function onInit(socket: Socket, _: void, cb: Function) {
  cb(socket.connected ? null : { message: "could not connect" });
}

type OnLeavePayload = {
  userId: string;
  roomId: string;
};

export async function onLeave(
  socket: Socket,
  payload: OnLeavePayload,
  cb: Function
) {
  socket.leave(payload.roomId);

  const user = await findUserById(payload.userId);
  if (user) {
    console.log(`${user?.username} left chat: ${payload.roomId}`);
    cb(null);
  } else {
    cb({ message: "user not found" });
  }
}

type JoinPayload = {
  userId: string;
  roomId: string;
};

export async function onJoin(
  socket: Socket,
  payload: JoinPayload,
  cb: Function
) {
  const room = await findRoomById(payload.roomId);
  const user = await findUserById(payload.userId);

  if (!room || !room) {
    cb({ message: "user or room dont exist yet" }, null);
    return;
  }

  cb(null, room);

  socket.join(room.id);

  console.log(`${user?.username} connected to chat: ${room.id}`);
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

type NewRoomPayload = {
  name: string;
  userId: string;
};

export async function onNewRoom(
  _: Socket,
  payload: NewRoomPayload,
  cb: Function
) {
  const user = await findUserById(payload.userId);

  if (user) {
    const room = await FindOrCreateRoom(
      {
        name: payload.name,
        users: {
          connect: {
            id: payload.userId,
          },
        },
      },
      user.id
    );
    cb(null, room);
  } else {
    cb({ message: "invalid user" }, null);
  }
}
