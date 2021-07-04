import { selectChats, setCurrentChat } from "@store/chat.slice";
import { useAppDispatch } from "@store/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoomTile from "./room-tile";

export default function RoomList() {
  const rooms = useSelector(selectChats);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-5">
      {rooms?.map((room, index) => {
        return (
          <Link
            key={room.id}
            to={`/chat?room=${room.id}`}
            onClick={() => {
              dispatch(setCurrentChat(index));
            }}
          >
            <RoomTile {...{ room, counter: index }} />
          </Link>
        );
      })}
    </div>
  );
}
