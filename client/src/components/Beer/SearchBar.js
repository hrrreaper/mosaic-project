import React, { useState, useContext, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import styled from 'styled-components';
import { BeerContext } from "../BeerProvider";

const SearchBar = () => {
  const {
    allBeers,
    filteredBeers,
    setFilteredBeers } = useContext(BeerContext);
  const [searchItem, setSearchItem] = useState("");

  const handleChange = (ev) => {
    setSearchItem(ev.target.value.toLowerCase());
  }

  useEffect(() => {
    if (allBeers) {
      setFilteredBeers(allBeers.filter((beer) => {
        let name = beer.beerName.toString().toLowerCase();
        let brewery = beer.brewery.toString().toLowerCase();
      return (name || brewery).includes(searchItem);
    }))
    }
  }, [searchItem])
  

  return (
    <>
    <Wrapper>
      <Input
        type="text"
        value={searchItem}
        onChange={(ev)=> handleChange(ev)} />
      
        <FiFilter size={20}/>
      

      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid grey;
  outline:none;
  margin-right: 5px;
`;


export default SearchBar
