import React, { useState, useContext, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import styled from 'styled-components';
import { BeerContext } from "../Context/BeerProvider";

const FilterBeer = () => {
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
        let style = beer.beerStyle.toString().toLowerCase();
        return name.includes(searchItem) || brewery.includes(searchItem) || style.includes(searchItem);
    }))
    }
  }, [searchItem])
  

  return (
    <>
    <Wrapper>
      <Input
        type="text"
        placeholder="find a beer"
        value={searchItem}
        onChange={(ev)=> handleChange(ev)} />
        <FiFilter size={15}/>
      </Wrapper>
      {searchItem ? (
      <Div>
      {filteredBeers.length} matches
      </Div>
      ) : (
        <Div></Div>
      )}
    </>
  )
}

const Div = styled.div`
  display: inline;
  margin-left: 21px;
  font-size: .75rem;
`;

const Wrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 5px;
  font-size: .8rem;
  padding: 2px;
  border: 1px solid grey;
  outline:none;
  margin-right: 5px;

  @media (max-width: 768px) {
    font-size: .7rem;
    padding: 1px;
  }
`;


export default FilterBeer;
