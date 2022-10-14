import React, { useState, useEffect, createContext } from "react";

import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes" });

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    checkUser();
  }, [currentUser]);

  const signin = async (user) => {
    const { userFound, token } = user;

    ls.set("token", JSON.stringify(token));
    ls.set("currentUser", JSON.stringify(userFound));
    setCurrentUser(user);
  };

  const signout = () => {
    setCurrentUser(null);
    ls.removeAll();
  };

  const checkUser = () => {
    let user = null;
    const auth = ls.get("currentUser");
    if (auth !== "") {
      user = JSON.parse(auth);
      if (!currentUser) setCurrentUser(user);
      else if (user.id !== currentUser.id) setCurrentUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
