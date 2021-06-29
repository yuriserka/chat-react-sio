import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import useForm from "../../hooks/useForm";
import styles from "./landing.module.css";

export default function LandingPage() {
  const { user, login } = useContext(UserContext);

  const [form, onFormChange] = useForm({
    username: user?.username ?? "",
    room: "",
  });

  const [error, setError] = useState(null);

  function onSubmit(event) {
    const { username, room } = form;

    if (!username || !room) {
      event.preventDefault();
      setError("Username and Room are required");
      return;
    }

    login({ username });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join a room</h1>
      <div className={styles.form}>
        <form autoComplete="off">
          <div className={styles["input-field"]}>
            <input
              value={form["username"]}
              placeholder="Enter your name"
              name="username"
              onChange={onFormChange}
            />
          </div>
          <div className={styles["input-field"]}>
            <input
              placeholder="Enter the room name"
              name="room"
              onChange={onFormChange}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <Link to={`/chat?room=${form.room}`}>
              <button
                className={styles["submit-btn"]}
                type="submit"
                onClick={onSubmit}
                children={"Sign in"}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
