import React, { useState, useContext, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import styled from 'styled-components';
import { BeerContext } from "./BeerProvider";

const SearchBar = () => {
  const { allBeers } = useContext(BeerContext);
  
  const [searchItem, setSearchItem] = useState("");
  const [beerNames, setBeerNames] = useState([]);

  const handleChange = (ev) => {
    setSearchItem(ev.target.value.toLowerCase());
  }

  
  // let filteredItems = allBeers.filter((item) => {
  //       setBeerNames(item.beerName.includes(searchItem))
  //       return beerNames.includes(searchItem);
  //     });
  
  // console.log("filter", beerNames);

  //TODO create new component for SearchItems and pass filteredItems to that then map them there


  return (
    <Wrapper>
      <Input
        type="text"
        onChange={handleChange} />
      <SearchButton>
        <FiSearch />
      </SearchButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 10px 35px;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid lightgrey;
  /* box-shadow: 0 0 3px 0 #ddd; */
  outline:none;
`;


export default SearchBar
