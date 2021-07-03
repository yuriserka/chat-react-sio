import { Message } from "../models/message";

function lastIndexOf<T>(array: T[], comp: (item: T) => boolean) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (comp(array[i])) return i;
  }
  return -1;
}

export function takeLastMessage(messages: Message[]) {
  if (!messages) return null;

  const idx = lastIndexOf(messages, (m) => m.author.nickname !== "admin");

  return idx < 0 ? null : messages[idx];
}
