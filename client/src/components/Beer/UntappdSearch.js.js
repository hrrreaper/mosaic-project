import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from "react-icons/fi";
import UntappdSearchItem from './UntappdSearchItem';

const UntappdSingleBeer = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (value.length >= 1) {
      
      fetch(`/beer/info/${value}`)
        .then((res) => res.json())
        .then((json) => {
          setResults(json.data.items)
        })
    }
    setValue('');
    }
    
    console.log("data from untappd", results);
  const handleChange = (ev) => {
    setValue(ev.target.value.toLowerCase());
  }

  return (
    <Wrapper>
      <Form>
      <Label htmlFor='beer'>search untappd:</Label>
      <Input
        type="text"
        value={value}
        id='beer'
        name='beer'
        onChange={(ev) => handleChange(ev)}
      
      ></Input>
      <SearchButton
      onClick={(ev) => handleSubmit(ev)}
      >
          <FiSearch size={25}/>
        </SearchButton>

        <ClearButton
          onClick={() => {
            setResults();
        }}
        >
        Clear results
        </ClearButton>
        </Form>

      {results && (
        <ListWrapper>
          <List>
            <UntappdSearchItem
              results={results}
              
            />
          </List>
        </ListWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const ClearButton = styled.button`
  background-color: transparent;
  border: 1px solid lightgrey;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid lightgrey;
  outline:none;
  width: 500px;
  height:30px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const List = styled.ul`
  margin-top: 20px;
  background-color: #FFF;
  padding: 15px 5px 0 5px;
  list-style-type: none;
  font-size: .8rem;
`;

const ListWrapper = styled.div`
  z-index: 10;
`;

export default UntappdSingleBeer;
