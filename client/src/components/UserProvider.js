import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userObj, setUserObj] = useState();

  const handleLogin = async (googleData) => {
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
          console.log("json", json.data)
          setUserObj(...json.data);
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
