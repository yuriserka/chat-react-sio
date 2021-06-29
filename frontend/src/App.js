import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./contexts/user";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route path="/" exact component={Landing} />
          <Route path="/chat" component={Chat} />
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
