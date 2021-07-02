import { Prisma } from "@prisma/client";
import { database } from "../common/database";

export function findUserByUsername(username: string) {
  return database.user.findFirst({
    where: {
      username,
    },
    include: {
      messages: true,
      rooms: {
        include: {
          messages: true,
        },
      },
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
      rooms: {
        include: {
          messages: true,
        },
      },
    },
  });
}

export function findOrCreateUser(user: Prisma.UserCreateInput) {
  return database.user.upsert({
    create: {
      ...user,
    },
    where: {
      id: user?.id ?? "",
    },
    update: {},
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
