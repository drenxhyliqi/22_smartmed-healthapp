import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  const logout = () => {
    setUserId(null);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, userId, setUserId, logout }}>
      {children}
    </UserContext.Provider>
  );
};
