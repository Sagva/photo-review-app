import React, { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const values = {};

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider as default };
