import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import ChatPage from "./pages/Chat";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import { attemptLogin } from "./store/auth.slice";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(attemptLogin())
      .then(unwrapResult)
      .then((user) => {
        if (user) history.replace("/app");
        else history.replace("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/app" exact component={LandingPage} />
      <Route path="/chat" component={ChatPage} />
    </Switch>
  );
}
