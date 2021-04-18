import React, { createContext, useState, useEffect } from 'react';

export const BeerContext = createContext(null);

export const BeerProvider = ({ children }) => {
  const [allBeers, setAllBeers] = useState();
  const [filteredBeers, setFilteredBeers] = useState();
  const [updateTapOn, setUpdateTapOn] = useState(false);
  const [updateTapOut, setUpdateTapOut] = useState(false);
  const [updateDelete, setUpdateDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showResults, setShowResults] = useState(true);

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
          setFilteredBeers(json.data);
        })
        .catch((err) => {
          
          console.log("ERROR",err.message)
        });
    });
    }, [updateTapOn, updateTapOut, updateDelete, update, submit]);
  
  return (
    <BeerContext.Provider value={{
      allBeers,
      updateTapOut,
      setUpdateTapOut,
      updateTapOn,
      setUpdateTapOn,
      filteredBeers,
      setFilteredBeers,
      updateDelete,
      setUpdateDelete,
      update,
      setUpdate,
      submit,
      setSubmit,
      showResults,
      setShowResults
    }}>
      {children}
    </BeerContext.Provider>
  )
};
