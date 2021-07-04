import ChatPage from "@pages/chat";
import LandingPage from "@pages/landing";
import LoginPage from "@pages/login";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  emitEventDisconnect,
  emitEventInitSocket,
  ListenToOnMessageEvent,
} from "@services/api/socket";
import { attemptLogin } from "@store/auth.slice";
import { receiveMessage } from "@store/chat.slice";
import { useAppDispatch } from "@store/index";
import { redirectUserAfterLogin } from "@utils/redirect-after-login";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

export default function App() {
  const dispatch = useAppDispatch();
  const { replace } = useHistory();

  useEffect(() => {
    emitEventInitSocket((err) => {
      if (err) {
        console.error({ err });
        return;
      }

      ListenToOnMessageEvent((incomingMessage) => {
        dispatch(receiveMessage(incomingMessage));
      });
    });

    return () => {
      emitEventDisconnect();
    };
  }, [dispatch]);

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
