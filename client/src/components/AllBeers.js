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
        All the beers we've had on tap. Current count: {allBeers?.length}
      </Title>
      {allBeers ? (
        <>
          <DivTitle>
          <Div>BEER</Div>
          <Div>STYLE</Div>
          <Div>BREWERY</Div>
          </DivTitle>
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
          </>
      ) : (
      <Loading />
      )
    }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 80vw;
  margin: auto;
`;

const BtnDiv = styled.div`
  margin: 0 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  margin: 20px;
`;

const DivTitle = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Div = styled.div`
  width: 20vw;
  text-align: left;
`;


export default AllBeers;
