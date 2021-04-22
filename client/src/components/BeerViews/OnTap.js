import React, {useContext}  from 'react';
import styled, { keyframes } from 'styled-components';
import { BeerContext } from '../Context/BeerProvider';
import Beer from '../Beer/Beer';
import { Link } from 'react-router-dom';

const OnTap = () => {
    const {
      allBeers,
  } = useContext(BeerContext);

  return (
    <Wrapper>
      <Title>
        beers we currently have on tap
      </Title>
      <TableDiv>
        
      <TableHeader>
        <Th>BEER</Th>
        <TypeTh>STYLE</TypeTh>
        <Th>BREWERY</Th>
        <TapTh>TAP OUT</TapTh>
      </TableHeader>
        
      
      {allBeers?.map((beer, index) => {
        if ((beer.tappedOn !== null) && (beer.tappedOn !== "") && (beer.tappedOut === "" || beer.tappedOut === null)) {
        return <Beer
          key={index}
          _id={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
          abv={beer.ABV}
          tappedOut={true}
          beer={beer}
        />
          
        }
      })}
        
        </TableDiv>
    </Wrapper>
  )
}

const TableDiv = styled.div`
  display: table;
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  `;

const TableHeader = styled.div`
  display: table-row;
  margin: 10px 0;
  display: flex;
  font-weight: 700;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: .8rem;
  }
`;

const Th = styled.div`
  display: table-cell;
  width: 20vw;
  text-align: left;

  @media (max-width: 768px) {
    font-size: .7rem;
    width: 22vw;
  }

  @media (max-width: 500px) {
    width: 27vw;
  }
`;
const TypeTh = styled.div`
  display: table-cell;
  width: 20vw;
  text-align: left;

  @media (max-width: 768px) {
    font-size: .7rem;
    width: 22vw;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;
const TapTh = styled.div`
  display: table-cell;
  width: 10vw;
  text-align: left;

  @media (max-width: 768px) {
    font-size: .7rem;
    width: 10vw;
  }
`;


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: 700;
  font-size: 1.5rem;
  animation: ${fadeIn} ease 1.5s;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


export default OnTap;
