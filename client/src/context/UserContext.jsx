import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });
  return (
    <UserDataContext.Provider value={{ user }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
