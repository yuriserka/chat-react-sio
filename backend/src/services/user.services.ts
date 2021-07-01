import { Prisma } from "@prisma/client";
import { database } from "../common/database";

export function findUserByUsername(username: string) {
  return database.user.findFirst({
    where: {
      username,
    },
    include: {
      messages: true,
      rooms: true,
    },
  });
}

export function findUserById(id: string) {
  return database.user.findFirst({
    where: {
      id,
    },
    include: {
      messages: true,
      rooms: true,
    },
  });
}

export function createUser(user: Prisma.UserCreateInput) {
  return database.user.create({
    data: user,
    include: {
      messages: true,
      rooms: true,
    },
  });
}

export function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return database.user.update({
    data,
    where: {
      id,
    },
  });
}

export function deleteUser(id: string) {
  return database.user.delete({
    where: {
      id,
    },
  });
}
