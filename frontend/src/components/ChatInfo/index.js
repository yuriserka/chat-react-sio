import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./chat-info.module.css";

export default function ChatInfo({ room, onLogout }) {
  return (
    <div className={styles["info-bar"]}>
      <div className={styles["chat-info"]}>
        <span className={`${styles.online} ${styles.indicator}`}></span>
        <span>Chat {room}</span>
      </div>
      <Link to="/" onClick={onLogout}>
        <FaArrowLeft color="white" size={20} />
      </Link>
    </div>
  );
}
