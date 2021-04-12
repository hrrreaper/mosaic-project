import React, { useContext, useEffect, } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Button from './Button'
import { BeerContext } from './BeerProvider';
import Beer from './Beer';

const AllBeers = () => {
  const {
      allBeers,
      sliceBeers,
      next,
      setNext,
      beersPerPage,
      beersToLoad,
  } = useContext(BeerContext);
  

  useEffect(() => {
      sliceBeers(0, beersPerPage);
    }, [])

  const handleMore = () => {
    sliceBeers(next, next + beersPerPage);
    setNext(next + beersPerPage);
  }

  return (
    <Wrapper>
      <Title>
        all the beers we've had on tap!
      </Title>
      {beersToLoad.map((beer, index) => {
        return <Beer
          key={index}
          _id={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
        />
      })}
      <BtnDiv>
      <Button onClick={handleMore}>Load beers</Button>
      </BtnDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 100vw;
  margin-left:185px
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
`;

const BtnDiv = styled.div`
  margin: 0 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
`;


export default AllBeers
