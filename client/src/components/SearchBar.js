import React, { useState, useContext } from 'react';
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const { allBeers } = useContext(BeerContext);
  

  const [searchItem, setSearchItem] = useState("");

  const handleChange = (ev) => {
    setSearchItem(ev.target.value.toLowerCase());
  }

  let filteredItems = allBeers.filter((item) => {
    let beerName = item.beerName.toLowerCase();
    return beerName.includes(searchItem);
  });

  //TODO create new component for SearchItems and pass filteredItems to that then map them there


  return (
    <div>
      <input
        type="text"
        onChange={handleChange} />
      <button>
        <FiSearch />
      </button>
    </div>
  )
}

export default SearchBar
