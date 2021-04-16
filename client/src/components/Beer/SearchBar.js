import React, { useState, useContext, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import styled from 'styled-components';
import { BeerContext } from "../BeerProvider";
import SearchItem from './SearchItem';

const SearchBar = () => {
  const { allBeers } = useContext(BeerContext);
  const [searchItem, setSearchItem] = useState("");
  const [beerNames, setBeerNames] = useState([]);

  const handleChange = (ev) => {
    setSearchItem(ev.target.value.toLowerCase());
  }

  useEffect(() => {
    if (allBeers && searchItem.length >= 2) {
      setBeerNames(allBeers.filter((beer) => {
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
      <SearchButton>
        <FiSearch />
      </SearchButton>
      
      {searchItem.length >= 2 && (
        <ListWrapper>
          <List>
            <SearchItem
              searchItem={searchItem}
              setSearchItem={setSearchItem}
              beerNames={beerNames}
            />
          </List>
        </ListWrapper>
      )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin: 5px;
`;

const List = styled.ul`
  background-color: #FFF;
  padding: 15px 5px 0 5px;
  list-style-type: none;
  font-size: .8rem;
  width: 170px;
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 97px;
  z-index: 10;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid lightgrey;
  outline:none;
`;


export default SearchBar
