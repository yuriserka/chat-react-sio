import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ChatInfo from "../components/chat-info";
import MessageInput from "../components/message-input";
import MessageList from "../components/message-list";
import {
  disconnectSocket,
  initiateSocket,
  subscribeToChat,
} from "../services/api/socket";
import { selectUser } from "../store/auth.slice";
import { receiveMessage } from "../store/chat.slice";

export default function ChatPage() {
  const user = useSelector(selectUser);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { replace } = useHistory();

  useEffect(() => {
    const { room } = queryString.parse(search);

    if (!user || !room) return;

    initiateSocket(user.id, room, (error) => {
      if (error) {
        alert(error.message);
        replace("/");
      }
    });

    subscribeToChat((incomingMessage) => {
      dispatch(receiveMessage(incomingMessage));
    });

    return () => {
      disconnectSocket();
    };
  }, [user, replace, dispatch, search]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-full">
        <ChatInfo />
        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
}
