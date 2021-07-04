import { logout, selectUser } from "@store/auth.slice";
import { quitChat } from "@store/chat.slice";
import { useAppDispatch } from "@store/index";
import { useState } from "react";
import { FaArrowLeft, FaRegComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NewRoomInput from "./new-room-input";

export default function LandingTopBar() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { replace } = useHistory();
  const [showInput, setShowInput] = useState(false);

  function onLogout() {
    dispatch(logout());
    dispatch(quitChat());
    replace("/");
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between p-3 items-center">
        <div className="flex space-x-5 items-center justify-between">
          <FaArrowLeft
            className="cursor-pointer"
            size={24}
            onClick={onLogout}
          />
          <p className="text-lg font-semibold">{user?.nickname}</p>
        </div>
        <div className="text-purple-700 mx-2">
          <FaRegComments
            className="cursor-pointer rounded-full"
            size={30}
            onClick={() => setShowInput((show) => !show)}
          />
        </div>
      </div>
      {showInput && (
        <div className="px-10 my-2">
          <NewRoomInput />
        </div>
      )}
    </div>
  );
}
