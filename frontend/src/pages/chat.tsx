import queryString from "query-string";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ChatTopBar from "../components/chat-top-bar";
import ChatMessageInput from "../components/chat-message-input";
import ChatMessageList from "../components/chat-message-list";
import {
  disconnectSocket,
  initiateSocket,
  subscribeToChat,
} from "../services/api/socket";
import { useAppDispatch } from "../store";
import { selectUser } from "../store/auth.slice";
import { receiveMessage } from "../store/chat.slice";

type QueryParams = {
  room: string;
};

export default function ChatPage() {
  const user = useSelector(selectUser);
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { replace } = useHistory();

  useEffect(() => {
    const { room } = queryString.parse(search) as unknown as QueryParams;

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
        <ChatTopBar />
        <ChatMessageList />
        <ChatMessageInput />
      </div>
    </div>
  );
}
