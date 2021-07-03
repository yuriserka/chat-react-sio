import { FaArrowLeft, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { quitChat, selectActualChat } from "../store/chat.slice";

export default function ChatInfo() {
  const room = useSelector(selectActualChat);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 w-full flex items-center justify-between px-4 h-14 bg-purple-900 text-white">
      <Link to="/app" onClick={() => dispatch(quitChat)}>
        <FaArrowLeft size={22} />
      </Link>
      <div className="flex flex-row space-x-4 items-center justify-center">
        <span className="text-lg font-bold">{room?.name}</span>
      </div>
      <FaUserFriends size={22} />
    </div>
  );
}
