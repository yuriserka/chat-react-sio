import RoomList from "@components/landing/room-list";
import LandingTopBar from "@components/landing/top-bar";
import Spinner from "@components/spinner";
import { selectIsLoggingIn } from "@store/auth.slice";
import { selectFetchingChats } from "@store/chat.slice";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const isLoggingIn = useSelector(selectIsLoggingIn);
  const isFetchingChats = useSelector(selectFetchingChats);

  if (isLoggingIn || isFetchingChats) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen flex-col">
      <LandingTopBar />
      <RoomList />
    </div>
  );
}
