import React, { useEffect, useState, useContext } from 'react';
import { BeerContext } from '../BeerProvider';
import styled from 'styled-components';
import SelectedSearch from './SelectedSearch';

const UntappdSearchItem = ({ results }) => {
  const { showResults, setShowResults } = useContext(BeerContext);

  const [status, setStatus] = useState('');
  const [beer, setBeer] = useState();


  return (
    <>
      {results && showResults === true && (
      <Wrapper>
          {results?.map((beer, index) => {
          return (
            <Search
              key={index}
            >
              <Button
                onClick={(ev) => {
                  setStatus('add');
                  setBeer(beer);
                  setShowResults(false);
                }} >
                <Results>
                  <Img src={beer.label_image} />
                  <TextDiv>
                    <Div><Span>Name:</Span> {beer.name}</Div>
                    <Div><Span>Brewery:</Span> {beer.brewery}</Div>
                    <Div><Span>Location:</Span> {beer.brewery_location}</Div>
                  </TextDiv>
                </Results>
              </Button>
            </Search>
          );
        })}
      </Wrapper>
      )}

      {beer && status === 'add' && showResults === false && (
        <SelectedSearch
          beer={beer}
          results={results}
        />
      )}
    </>  
  )
}

const Wrapper = styled.div`
`;

const Results = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  margin-left: 10px;
  text-align: left;
`;

const Span = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  font-size: .8rem;
`;

const Search = styled.li`
  margin-bottom: 3px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 10px;

  &:hover {
    font-weight: 700;
    transform: scale(1.02);
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }
`;

const Button = styled.button`
  width: 500px;
  padding: 10px;
  background-color: #FFF;
  border: none;
  cursor: pointer;
`;


export default UntappdSearchItem;
