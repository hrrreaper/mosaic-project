import React, { createContext, useState, useEffect } from 'react';

export const BeerContext = createContext(null);

export const BeerProvider = ({ children }) => {
  const [allBeers, setAllBeers] = useState();
  const [updateTapOn, setUpdateTapOn] = useState(false);
  const [updateTapOut, setUpdateTapOut] = useState(false);


    useEffect(() => {
    fetch("/beers").then((res) => {
      res
        .json()
        .then((json) => {
          setAllBeers(json.data);
          
        })
        .catch((err) => {
          
          console.log("ERROR",err.message)
        });
    });
    }, []);
  
    useEffect(() => {
    fetch("/beers").then((res) => {
      res
        .json()
        .then((json) => {
          setAllBeers(json.data);
          
        })
        .catch((err) => {
          
          console.log("ERROR",err.message)
        });
    });
    }, [updateTapOn, updateTapOut]);
  
  return (
    <BeerContext.Provider value={{
      allBeers,
      updateTapOut,
      setUpdateTapOut,
      updateTapOn,
      setUpdateTapOn,
    }}>
      {children}
    </BeerContext.Provider>
  )
};
