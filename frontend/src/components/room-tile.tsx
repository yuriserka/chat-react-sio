import { Room } from "../models/room";
import { formatDate } from "../services/date";
import { parseEmojisFromText } from "../util/parse-emoji-from-text";
import { takeLastMessage } from "../util/take-last-message";

type Props = {
  room: Room;
};

export default function RoomTile({ room }: Props) {
  const lastMessage = takeLastMessage(room.messages);

  return (
    <div className="flex flex-row items-center bg-red-100 px-3">
      <img
        className="p-1 mr-2 h-20 w-20 rounded-full bg-transparent"
        loading="lazy"
        alt={room.name}
        src="https://avatars.githubusercontent.com/u/32364111?v=4"
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg font-semibold">{room.name}</p>
        <p className="line-clamp-1">
          {parseEmojisFromText(lastMessage?.content) ?? "No messages"}
        </p>
      </div>
      {lastMessage && (
        <p className="flex ml-auto">{formatDate(lastMessage.createdAt)}</p>
      )}
    </div>
  );
}
