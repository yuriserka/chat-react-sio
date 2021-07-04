import ChatMessageInput from "@components/chat/message-input";
import ChatMessageList from "@components/chat/message-list";
import ChatTopBar from "@components/chat/top-bar";
import { emitEventJoinRoom, emitEventLeaveChat } from "@services/api/socket";
import { selectUser } from "@store/auth.slice";
import { useAppDispatch } from "@store/index";
import queryString from "query-string";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

type QueryParams = {
  room: string;
};

export default function ChatPage() {
  const user = useSelector(selectUser);
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { replace } = useHistory();

  if (!user) {
    replace("/app");
  }

  useEffect(() => {
    const { room } = queryString.parse(search) as unknown as QueryParams;

    if (!user || !room) return;

    emitEventJoinRoom(user.id, room, (error) => {
      if (error) {
        alert(error.message);
        replace("/");
      }
    });

    return () => {
      emitEventLeaveChat({ roomId: room, userId: user.id }, (err) => {
        if (err) console.error({ err });
      });
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
