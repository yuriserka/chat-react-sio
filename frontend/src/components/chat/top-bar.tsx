import { quitChat, selectActualChat, showUsers } from "@store/chat.slice";
import { useAppDispatch } from "@store/index";
import { FaArrowLeft, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ChatTopBar() {
  const room = useSelector(selectActualChat);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 w-full flex items-center justify-between px-4 h-14 bg-purple-900 text-white">
      <Link to="/app" onClick={() => dispatch(quitChat())}>
        <FaArrowLeft size={22} />
      </Link>
      <div className="flex flex-row space-x-4 items-center justify-center">
        <span className="text-lg font-bold">{room?.name}</span>
      </div>
      <FaUserFriends
        className="cursor-pointer"
        size={22}
        onClick={() => dispatch(showUsers())}
      />
    </div>
  );
}
