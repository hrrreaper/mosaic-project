import React, {useContext}  from 'react';
import styled from 'styled-components';
import { BeerContext } from './Context/BeerProvider';
import Beer from './Beer/Beer';

const OnTap = () => {
    const {
      allBeers,
  } = useContext(BeerContext);

  return (
    <Wrapper>
      <Title>
        Beer currently on tap:
      </Title>
      <DivTitle>
        <Div>BEER</Div>
        <Div>STYLE</Div>
        <Div>BREWERY</Div>
        <AbvDiv>TAP OUT</AbvDiv>
      </DivTitle>
      
      {allBeers?.map((beer, index) => {
        if ((beer.tappedOn !== null) && (beer.tappedOn !== "") && (beer.tappedOut === "" || beer.tappedOut === null)) {
        return <Beer
          key={index}
          _id={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
          abv={beer.ABV}
          tapOut={true}
          beer={beer}
        />
          
        }
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: auto;
  max-width: 80vw;
  `;

const DivTitle = styled.div`
  max-width: 80vw;
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.3rem;
`;

const Div = styled.div`
  width: 500px;
  text-align: left;
  font-size: 1.2rem;
`;
const AbvDiv = styled.div`
  width: 200px;
  text-align: left;
  font-size: 1.2rem;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 1.2rem;
`;


export default OnTap;
