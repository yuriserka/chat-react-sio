import { Message } from "./message";
import { Room } from "./room";

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  password: string;
  nickname: string;
  token: string;
  rooms: Room[];
  messages: Message[];
};
