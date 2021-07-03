import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ChatPage from "./pages/chat";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import { useAppDispatch } from "./store";
import { attemptLogin } from "./store/auth.slice";
import { redirectUserAfterLogin } from "./util/redirect-after-login";

export default function App() {
  const dispatch = useAppDispatch();
  const { replace } = useHistory();

  useEffect(() => {
    dispatch(attemptLogin())
      .then(unwrapResult)
      .then((user) => redirectUserAfterLogin(user, replace, dispatch));
  }, [replace, dispatch]);

  return (
    <div className="tracking-wide">
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/app" exact component={LandingPage} />
        <Route path="/chat" exact component={ChatPage} />
      </Switch>
    </div>
  );
}
