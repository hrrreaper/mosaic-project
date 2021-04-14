import React, { useContext, useEffect, } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Button from './Button'
import Login from './Login';
import { BeerContext } from './BeerProvider';
import Beer from './Beer';
import Mosaic from '../assets/mosaictext.png';


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
        <Img src={Mosaic} />
      </Title>
      {/* //TODO add the current menu from untappd */}
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

const Img = styled.img`
  width: 300px;
`;

export default Homepage;
