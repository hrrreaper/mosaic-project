import React, {useContext} from 'react';
import styled from 'styled-components';
import { BeerContext } from './BeerProvider';
import Beer from './Beer';

const InStock = () => {
  const {
      allBeers,
  } = useContext(BeerContext);

  return (
    <Wrapper>
      <Title>
        Keg currently in stock not tapped:
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
  max-width: 80vw;
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

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 1.2rem;
`;

export default InStock;
