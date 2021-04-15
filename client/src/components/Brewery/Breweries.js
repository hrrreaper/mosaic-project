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
    <>
      <DivTitle>
        Breweries
      </DivTitle>
      <SubTitle>
        unique breweries: {uniqueBreweries.length}
      </SubTitle>
    <Wrapper>
      {allBeers ? (
        <>
        
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
  </>
  )
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
`;

const DivTitle = styled.h2`
  width: 80vw;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
`;

const SubTitle = styled.h3`
width: 80vw;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  margin: 10px 0;
`;


export default Breweries;
