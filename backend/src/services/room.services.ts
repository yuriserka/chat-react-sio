import { Prisma } from "@prisma/client";
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
      users: true,
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

export function FindOrCreateRoom(room: Prisma.RoomCreateInput, userId: string) {
  return database.room.upsert({
    create: {
      ...room,
    },
    where: { name: room.name },
    update: {
      users: {
        connect: {
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
