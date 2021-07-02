import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../services/date";
import { selectChats, setCurrentChat } from "../store/chat.slice";
import { takeLastMessage } from "../util/take-last-message";

export default function RoomsList() {
  const rooms = useSelector(selectChats);
  const dispatch = useDispatch();

  return (
    <div className="space-y-5">
      {rooms?.map((room, index) => {
        const lastMessage = takeLastMessage(room.messages);

        return (
          <Link
            key={room.id}
            to={`/chat?room=${room.id}`}
            onClick={() => {
              dispatch(setCurrentChat(index));
            }}
          >
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
                  {lastMessage?.content ?? "No messages"}
                </p>
              </div>
              {lastMessage && (
                <p className="flex ml-auto">
                  {formatDate(lastMessage.createdAt)}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
