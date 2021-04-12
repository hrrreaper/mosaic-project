import React, { useContext, useEffect, } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Button from './Button'
import Login from './Login';
import { BeerContext } from './BeerProvider';
import Beer from './Beer';


const Homepage = () => {
  const {
      allBeers,
      sliceBeers,
      next,
      setNext,
      beersPerPage,
      beersToLoad,
  } = useContext(BeerContext);
  

  return (
    <Wrapper>
      <Title>
      </Title>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  height: 100vh;
  max-width: 100vw;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

export default Homepage;
