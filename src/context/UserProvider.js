import React, { useState, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) history.push("/");
  }, [history]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};
export default UserProvider;