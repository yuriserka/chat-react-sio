import { database } from "../common/database";

export function findRoomById(id: string) {
  return database.room.findFirst({
    where: { id },
  });
}

export function findRoomByName(name: string) {
  return database.room.findFirst({
    where: { name },
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
