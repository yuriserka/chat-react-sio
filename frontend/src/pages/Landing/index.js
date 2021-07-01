import { useSelector } from "react-redux";
import { selectIsLoggingIn, selectUser } from "../../store/auth.slice";
import Spinner from "../../components/Spinner";

export default function LandingPage() {
  const user = useSelector(selectUser);
  const isLoggingIn = useSelector(selectIsLoggingIn);

  if (isLoggingIn) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen flex-col">
      <h1>{user?.nickname}</h1>
    </div>
  );
}
