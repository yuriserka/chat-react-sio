import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectActualChat } from "../store/chat.slice";
import MessageTile from "./message-tile";

export default function MessageList() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const room = useSelector(selectActualChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room?.messages]);

  return (
    <div className="overflow-y-auto flex-1 px-2 mt-16">
      <div className="flex flex-col space-y-2 items-center justify-center">
        {room?.messages.map((message) => (
          <MessageTile {...{ message }} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
