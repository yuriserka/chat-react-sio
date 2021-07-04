import { Message } from "@models/message";
import { selectUser } from "@store/auth.slice";
import { parseEmojisFromText } from "@utils/parse-emoji-from-text";
import { useSelector } from "react-redux";

type Props = {
  message: Message;
};

export default function MessageTile({ message }: Props) {
  const user = useSelector(selectUser);
  const sent = message.author.id === user?.id;

  return (
    <div
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
