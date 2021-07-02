import { useSelector } from "react-redux";
import RoomsList from "../components/roomsList";
import Spinner from "../components/spinner";
import TopBar from "../components/topBar";
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
        <TopBar />
      </div>
      <RoomsList />
    </div>
  );
}
