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
          const sent = m.username === user.username.trim().toLowerCase();
          return (
            <div
              className={`${styles[sent ? "sent" : "received"]} ${
                styles["message-container"]
              }`}
              key={m.id}
            >
              {!sent && <h3>{m.username}</h3>}
              <span>{ReactEmoji.emojify(m.text)}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
