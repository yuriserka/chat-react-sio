import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => ({
    username: localStorage.getItem("@chat:username"),
  }));

  function login(user) {
    setUser(user);
    localStorage.setItem("@chat:username", user.username);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("@chat:username");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
