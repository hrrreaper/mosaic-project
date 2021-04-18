import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userObj, setUserObj] = useState(user);

  const handleLogin = (googleData) => {
      fetch('/api/v1/auth/google', {
      method: "POST",
      body: JSON.stringify({
        profileObj: googleData.profileObj,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
        .then((res) => res.json())
        .then((json) => {
          setUserObj(json.data);
          localStorage.setItem('user', JSON.stringify(json.data));
      })
  };
  

  return (
    <UserContext.Provider value={{
      userObj,
      setUserObj,
      handleLogin,
    }}>
      {children}
    </UserContext.Provider>
  );
};