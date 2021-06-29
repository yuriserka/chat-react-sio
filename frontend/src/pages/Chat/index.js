import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChatInfo from "../../components/ChatInfo";
import MessageInput from "../../components/MessageInput";
import MessageList from "../../components/MessageList";
import { UserContext } from "../../contexts/user";
import {
  disconnectSocket,
  initiateSocket,
  subscribeToChat,
} from "../../services/api";
import styles from "./chat.module.css";

export default function ChatPage({ location }) {
  const [actualRoom, setActualRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const { push } = useHistory();
  const { user, logout } = useContext(UserContext);

  if (!user) {
    push("/");
  }

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    setActualRoom(room);
  }, [location.search]);

  useEffect(() => {
    if (!user || !actualRoom) return;

    initiateSocket(user.username, actualRoom, (error) => {
      if (error) {
        alert(error.message);
        push("/");
      }
    });

    subscribeToChat((message) => {
      setMessages((s) => [...s, message]);
    });

    return () => {
      disconnectSocket();
    };
  }, [user, actualRoom, push]);

  return (
    <div className={styles.container}>
      <div className={styles["chat-container"]}>
        <div className={styles.chat}>
          <ChatInfo room={actualRoom} onLogout={logout} />
          <MessageList {...{ user, messages }} />
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
