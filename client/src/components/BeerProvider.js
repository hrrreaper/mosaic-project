import React, { createContext, useState, useEffect } from 'react'

export const BeerContext = createContext(null);

export const BeerProvider = ({ children }) => {
  const [allBeers, setAllBeers] = useState();

    useEffect(() => {
    fetch("/beers").then((res) => {
      res
        .json()
        .then((json) => {
          setAllBeers(json.data);
          // setStatus("idle");
        })
        .catch((err) => {
          // setStatus("error");
          console.log(err.message)
        });
    });
  }, []);


  return (
    <BeerContext.Provider value={{
      allBeers
    }}>
      {children}
    </BeerContext.Provider>
  )
};
