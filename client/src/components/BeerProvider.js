import React, { createContext, useState, useEffect } from 'react'

export const BeerContext = createContext(null);

export const BeerProvider = ({ children }) => {
  const [allBeers, setAllBeers] = useState();
  const [beersToLoad, setBeersToLoad]=useState([]);
  const [next, setNext] = useState(5);
  const [status, setStatus] = useState("loading");
  const beersPerPage = 20;
  let arrOfBeers = [];

    useEffect(() => {
    fetch("/beers").then((res) => {
      res
        .json()
        .then((json) => {
          setAllBeers(json.data);
          setStatus("idle");
        })
        .catch((err) => {
          setStatus("error");
          console.log("ERROR",err.message)
        });
    });
    }, []);
  
  
  const sliceBeers = (start, end) => {
    if (status === "idle") {
      const slicedBeers = allBeers.slice(start, end);
      arrOfBeers = [...arrOfBeers, ...slicedBeers];
      setBeersToLoad(arrOfBeers);
      }
    }

  return (
    <BeerContext.Provider value={{
      allBeers,
      sliceBeers,
      next,
      setNext,
      beersPerPage,
      beersToLoad,
      setBeersToLoad
    }}>
      {children}
    </BeerContext.Provider>
  )
};
