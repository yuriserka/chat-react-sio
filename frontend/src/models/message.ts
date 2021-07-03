import { Room } from "./room";
import { User } from "./user";

export type Message = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  author: User;
  authorId: string;
  room: Room;
  roomId: string;
};
