import { emitEventNewRoom } from "@services/api/socket";
import { selectUser } from "@store/auth.slice";
import { appendNewRoom } from "@store/chat.slice";
import { useAppDispatch } from "@store/index";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function NewRoomInput() {
  const [name, setName] = useState("");
  const userId = useSelector(selectUser)?.id!;
  const dispatch = useAppDispatch();

  function onSubmit() {
    emitEventNewRoom({ name, userId }, (err, room) => {
      if (err) {
        console.error({ err });
        return;
      }
      dispatch(appendNewRoom(room));
      setName("");
    });
  }

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="rounded-xl w-full h-8"
      autoFocus
      placeholder="Join/Create a room"
      onKeyPress={(e) => (e.key === "Enter" ? onSubmit() : null)}
      autoComplete="off"
    />
  );
}
