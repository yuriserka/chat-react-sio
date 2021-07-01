import { useEffect, useRef } from "react";
import ReactEmoji from "react-emoji";
import styles from "./message-list.module.css";

export default function MessageList({ user, messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles["messages-list-container"]}>
      <div className={styles.messages}>
        {messages.map((m) => {
          const { nickname } = m.author;
          const sent = nickname === user.nickname;
          console.log(m);
          return (
            <div
              className={`${styles[sent ? "sent" : "received"]} ${
                styles["message-container"]
              }`}
              key={m.id}
            >
              {!sent && <h3>{nickname}</h3>}
              <span>{ReactEmoji.emojify(m.content)}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
