import React, {useContext} from 'react';
import styled from 'styled-components';
import { BeerContext } from '../BeerProvider';
import Loading from '../Loading';
import Brewery from './Brewery';

const Breweries = () => {
  const {
      allBeers,
  } = useContext(BeerContext);

  let uniqueBreweries = [...new Set(allBeers?.map(item => item.brewery))];
  
  return (
    <Wrapper>
      {allBeers ? (
        <>
          <DivTitle>
          Breweries
          </DivTitle>
      {uniqueBreweries.map((brewery, index) => {
        return <Brewery
          key={index}
          brewery={brewery}
        />
      })}
          </>
      ) : (
      <Loading />
      )
      }
    </Wrapper>
  
  )
};

const Wrapper = styled.div`
  height: 100vh;
  max-width: 80vw;
  margin: auto;
`;

const DivTitle = styled.div`
  margin: 20px 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
`;


export default Breweries;
