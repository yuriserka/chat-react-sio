import { useSelector } from "react-redux";
import { selectActualChat, selectIsShowingUsers } from "../../store/chat.slice";

export default function UsersList() {
  const users = useSelector(selectActualChat)?.users;
  const showingUsers = useSelector(selectIsShowingUsers);

  if (!showingUsers) return null;

  return (
    <div className="flex flex-col items-center mt-16">
      {users?.map((u) => (
        <p>{u.nickname}</p>
      ))}
    </div>
  );
}
