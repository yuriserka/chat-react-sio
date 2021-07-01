import { Prisma } from "@prisma/client";
import { database } from "../common/database";

export function createMessage(message: Prisma.MessageCreateInput) {
  return database.message.create({
    data: message,
    include: {
      author: true,
    },
  });
}

export function createAdminMessage(content: string) {
  return {
    author: {
      nickname: "admin",
    },
    content,
  };
}
