import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { FiSearch } from "react-icons/fi";
import UntappdSearchItem from './UntappdSearchItem';
import FormButton from '../Buttons/FormButton';
const { REACT_APP_API_ID } = process.env;

const UntappdSearch = () => {

  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + REACT_APP_API_ID).toString('base64');
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (value.length >= 1 ) {
      fetch(`https://business.untappd.com/api/v1/items/search?q=${value}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": auth,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setResults(json.items)
        })
        .catch((err) => {
        console.log("ERROR", err.message)
      })
    }
  }
    
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
        placeholder="find a beer through untappd"
        id='beer'
        name='beer'
        onChange={(ev) => handleChange(ev)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
            handleSubmit(ev)
          }
        }}
        ></Input>
        
      <FormButton
      onClick={(ev) => handleSubmit(ev)}
      >
          <BtnText>
          <Txt>search</Txt>  <FiSearch size={15}/>
          </BtnText>
      </FormButton>

        <FormButton
          onClick={(ev) => {
            ev.preventDefault();
            setResults();
            setValue('');
        }}
        >
        clear
        </FormButton>
        </Form>

      {results && (
        <ListWrapper>
          <List>
            <UntappdSearchItem
              key={uuidv4()}
              results={results}
              setResults={setResults}
              value={value}
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
  margin-top: 50px;

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
`;
const BtnText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const Txt = styled.span`
  margin-right: 5px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid grey;
  outline:none;
  width: 30vw;
  height:30px;
  margin-right:10px;
`;

const Label = styled.label`
  margin-right: 5px;
  font-weight: 700;
  text-align: right;
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

export default UntappdSearch;
