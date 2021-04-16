import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const SearchItem = ({ beerNames, searchItem, setSearchItem }) => {

  let uniqueBeers = [...new Set(beerNames.map((item) => item))];

  const handleClick = () => {
    setSearchItem("")
  }
  
  return (
    <>
      {beerNames.length > 0 && (
      <Wrapper>
        {uniqueBeers.map((beer, index) => {
          let searchIndex = beer.beerName.toLowerCase().indexOf(searchItem);
          let firstHalf = beer.beerName.slice(0, searchIndex + searchItem.length);
          let secondHalf = beer.beerName.slice(searchIndex + searchItem.length);
            return (
              <Search>
                <SearchLink to={`/beer/${beer._id}`}
                  onClick={() => handleClick()} >
                <span>
                  {firstHalf}
                  <Prediction>{secondHalf}</Prediction>
                </span>
                </SearchLink>
              </Search>
            );
        })}
      </Wrapper>
    )}
    </>
  )
}

const Search = styled.li`
  margin-bottom: 3px;
`;

const SearchLink = styled(NavLink)`
  color: #000;
  text-decoration: none;

  &:hover{
    text-decoration: underline;
    font-weight: 700;
  }
`;

const Wrapper = styled.div`
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  
`;

const Prediction = styled.span`
  font-weight: 700;
`;

export default SearchItem;
