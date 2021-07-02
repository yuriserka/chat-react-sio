import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { quitChat, selectActualChat } from "../store/chat.slice";

export default function ChatInfo() {
  const room = useSelector(selectActualChat);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 w-full flex items-center justify-between px-4 h-14 bg-purple-900 text-white">
      <span className={`mr-4 bg-green-500 rounded-xl w-4 h-4 animate-pulse `} />
      <span className="text-lg font-bold">{room?.name}</span>
      <Link to="/app" onClick={() => dispatch(quitChat())}>
        <FaArrowLeft size={22} />
      </Link>
    </div>
  );
}
