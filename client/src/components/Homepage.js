import React, { useContext } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Button from './Button'
import Login from './Login';
import { BeerContext } from './BeerProvider';
import Beer from './Beer';


const Homepage = () => {
  const { allBeers } = useContext(BeerContext);

  return (
    <Wrapper>
      <div>
        <Login />
      </div>
      <Title>
        MOSAIC BEER BAR
      </Title>
      {/* {allBeers?.map((beer) => {
        return <Beer
          key={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
        />
      })} */}
    </Wrapper>
  
  )
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
`

export default Homepage;
