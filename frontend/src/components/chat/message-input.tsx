import { emitEventSendMessage } from "@services/api/socket";
import { selectUser } from "@store/auth.slice";
import { selectActualChat, sendNewMessage } from "@store/chat.slice";
import { useAppDispatch } from "@store/index";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const userId = useSelector(selectUser)?.id!;
  const roomId = useSelector(selectActualChat)?.id!;
  const dispatch = useAppDispatch();

  function onSubmit() {
    if (message.length) {
      emitEventSendMessage(
        { content: message, roomId, userId },
        (err, messageSent) => {
          if (err) {
            console.error({ err });
            return;
          }
          dispatch(sendNewMessage(messageSent));
          setMessage("");
        }
      );
    }
  }

  return (
    <div className="bottom-0 fixed w-full flex items-center justify-between mt-4 bg-gradient-to-r from-purple-300 to-purple-600 via-indigo-400 animate-gradient-x">
      <input
        className="rounded-full m-2 w-full"
        type="text"
        autoFocus
        value={message}
        placeholder="Say hi..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? onSubmit() : null)}
        autoComplete="off"
      />
      <div className="mx-2 cursor-pointer text-white" onClick={onSubmit}>
        <div className="bg-black rounded-full p-1">
          <FaAngleRight size={25} />
        </div>
      </div>
    </div>
  );
}