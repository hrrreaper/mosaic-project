import React, { useState } from 'react';
import styled from 'styled-components';
import SelectedSearch from './SelectedSearch';

const UntappdSearchItem = ({ results }) => {
  const [status, setStatus] = useState('');
  const [beer, setBeer] = useState();


  return (
    <>
      {results && status === '' && (
      <Wrapper>
          {results?.map((beer, index) => {
          return (
            <Search>
              <Button
                onClick={(ev) => {
                  setStatus('add');
                  setBeer(beer);
                }} >
                <div>Name: {beer.name}</div>
                <div>Brewery: {beer.brewery}</div>
              </Button>
            </Search>
          );
        })}
      </Wrapper>
      )}

      {beer && status === 'add' && (
        <SelectedSearch
          beer={beer}
        />
      )}
    </>  
  )
}

const Wrapper = styled.div`
`;

const Search = styled.li`
  margin-bottom: 3px;

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
