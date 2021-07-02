import { database } from "../common/database";

export function findRoomsByUserId(userId: string) {
  return database.room.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      messages: {
        include: {
          author: true,
        },
      },
    },
  });
}

export function findRoomById(id: string) {
  return database.room.findFirst({
    where: { id },
    include: {
      messages: {
        include: {
          author: true,
        },
      },
    },
  });
}

export function findRoomByName(name: string) {
  return database.room.findFirst({
    where: { name },
    include: {
      messages: true,
    },
  });
}

export function FindOrCreateRoom(name: string) {
  return database.room.upsert({
    create: {
      name,
    },
    where: { name },
    update: {},
  });
}
