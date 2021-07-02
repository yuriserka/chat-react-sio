import { Prisma } from "@prisma/client";
import { database } from "../common/database";
import { adminId } from "../common/env";
import { v4 as uuid } from "uuid";

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
    id: uuid(),
    author: {
      nickname: "admin",
      id: adminId,
    },
    content,
  };
}
