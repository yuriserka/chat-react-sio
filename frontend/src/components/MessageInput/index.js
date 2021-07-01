import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { sendMessage } from "../../services/api/socket";
import styles from "./message-input.module.css";

export default function MessageInput() {
  const [message, setMessage] = useState("");

  function onSubmit() {
    if (message.length) {
      sendMessage(message, () => {
        setMessage("");
      });
    }
  }

  return (
    <div className={styles["input-field"]}>
      <input
        value={message}
        placeholder="Say hi..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? onSubmit(e) : null)}
        autoComplete="off"
      />
      <div className={styles["send-icon"]} onClick={onSubmit}>
        <FaAngleRight color="black" />
      </div>
    </div>
  );
}
