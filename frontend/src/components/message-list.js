import { useEffect, useRef } from "react";
import ReactEmoji from "react-emoji";
import { useSelector } from "react-redux";
import { selectUser } from "../store/auth.slice";
import { selectActualChat } from "../store/chat.slice";

export default function MessageList() {
  const messagesEndRef = useRef(null);
  const user = useSelector(selectUser);
  const room = useSelector(selectActualChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room?.messages]);

  return (
    <div className="overflow-y-auto flex-1 px-2 mt-16">
      <div className="flex flex-col space-y-2 items-center justify-center">
        {room?.messages?.map((m) => {
          const sent = m.author.id === user.id;

          return (
            <div
              key={m.id}
              style={{ maxWidth: "50%", width: "fit-content" }}
              className={`inline-block break-words border border-black p-3 ${
                sent ? "self-end" : "self-start"
              } rounded-xl`}
            >
              {!sent && (
                <h3 className="self-start font-semibold">
                  {m.author.nickname}
                </h3>
              )}
              <span>{ReactEmoji.emojify(m.content)}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
