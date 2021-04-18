import React, {useContext} from 'react';
import styled from 'styled-components';
import { BeerContext } from '../Context/BeerProvider';
import Beer from './Beer';

const InStock = () => {
  const {
      allBeers,
  } = useContext(BeerContext);

  return (
    <Wrapper>
      <Title>
        Beers currently in stock:
      </Title>
      <DivTitle>
        <Div>BEER</Div>
        <Div>STYLE</Div>
        <Div>BREWERY</Div>
      </DivTitle>
      
      {allBeers?.map((beer, index) => {
        if (!beer.tappedOn) {
        return <Beer
          key={index}
          _id={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
        />
          
        }
      })}
    </Wrapper>
  )
};

  const Wrapper = styled.div`
  margin: auto;
  max-width: 75vw;
  `;

  const DivTitle = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.3rem;
`;

const Div = styled.div`
  width: 20vw;
  text-align: left;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 1.2rem;
`;

export default InStock;
