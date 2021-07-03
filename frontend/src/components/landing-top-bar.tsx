import { FaArrowLeft, FaRegComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logout, selectUser } from "../store/auth.slice";
import { quitChat } from "../store/chat.slice";

export default function TopBar() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { replace } = useHistory();

  function onLogout() {
    dispatch(logout);
    dispatch(quitChat);
    replace("/");
  }

  return (
    <div className="flex flex-col">
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
          <FaRegComments className="cursor-pointer" size={30} />
        </div>
      </div>
    </div>
  );
}
