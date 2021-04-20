import React from 'react';
import styled from "styled-components";
import BeerForm from './Beer/BeerForm.js';
import UntappdSearch from './UntappdSearch/UntappdSearch.js';

const AddBeer = () => {
  
  return (
    <Wrapper>
      <UntappdSearch />
      <BeerForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  
`;



export default AddBeer;
