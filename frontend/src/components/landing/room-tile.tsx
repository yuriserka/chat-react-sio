import { Room } from "@models/room";
import { formatDateRelative } from "@services/date";
import { parseEmojisFromText } from "@utils/parse-emoji-from-text";
import { takeLastNotAdminMessage } from "@utils/take-last-not-admin-message";

type Props = {
  room: Room;
  picId: number;
};

export default function RoomTile({ room, picId }: Props) {
  const lastMessage = takeLastNotAdminMessage(room.messages);

  return (
    <div className="flex flex-row items-center shadow-sm px-3">
      <img
        className="p-1 mr-2 h-20 w-20 rounded-full bg-transparent"
        loading="lazy"
        alt={room.name}
        src={`https://picsum.photos/400/${500 + picId}`}
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg font-semibold">{room.name}</p>
        <p className="line-clamp-1">
          {parseEmojisFromText(lastMessage?.content) ?? "No messages"}
        </p>
      </div>
      {lastMessage && (
        <p className="flex ml-auto">
          {formatDateRelative(lastMessage.createdAt)}
        </p>
      )}
    </div>
  );
}
