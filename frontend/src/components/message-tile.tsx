import { useSelector } from "react-redux";
import { Message } from "../models/message";
import { selectUser } from "../store/auth.slice";
import { parseEmojisFromText } from "../util/parse-emoji-from-text";

type Props = {
  message: Message;
};

export default function MessageTile({ message }: Props) {
  const user = useSelector(selectUser);
  const sent = message.author.id === user?.id;

  return (
    <div
      key={message.id}
      style={{ maxWidth: "75%", width: "fit-content" }}
      className={`inline-block break-words border border-black p-3 ${
        sent ? "self-end" : "self-start"
      } rounded-xl`}
    >
      {!sent && (
        <h3 className="self-start font-semibold">{message.author.nickname}</h3>
      )}
      <span>{parseEmojisFromText(message.content)}</span>
    </div>
  );
}
