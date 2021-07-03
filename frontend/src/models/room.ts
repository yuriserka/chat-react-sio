import { Message } from "./message";
import { User } from "./user";

export type Room = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  users: User[];
  messages: Message[];
};
