import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import ChatPage from "./pages/chat";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import { attemptLogin } from "./store/auth.slice";
import { redirectUserAfterLogin } from "./util/redirect-after-login";

export default function App() {
  const dispatch = useDispatch();
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
