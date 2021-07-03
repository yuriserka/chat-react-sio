import { useSelector } from "react-redux";
import RoomList from "../components/room-list";
import Spinner from "../components/spinner";
import LandingTopBar from "../components/landing-top-bar";
import { selectIsLoggingIn } from "../store/auth.slice";
import { selectFetchingChats } from "../store/chat.slice";

export default function LandingPage() {
  const isLoggingIn = useSelector(selectIsLoggingIn);
  const isFetchingChats = useSelector(selectFetchingChats);

  if (isLoggingIn || isFetchingChats) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="w-screen">
        <LandingTopBar />
      </div>
      <RoomList />
    </div>
  );
}
