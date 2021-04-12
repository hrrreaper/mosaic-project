import React from 'react';
import { useHistory } from 'react-router';
import styled from "styled-components";
import Button from './Button';

const Sidebar = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Div>This is the sidebar</Div>
      <Button onClick={() => {
        history.push("/beers")
      }}>View Beers</Button>
      <Button>View Breweries</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  position: fixed;
  float: left;
  height: 100vh;
  width: 200px;
  top: 0; 
  font-weight: 500;
  background-color: rgba(100,250,0,0.2);
  box-shadow: 3px 3px 5px -2px rgba(0,200,0,0.3); 
  
`;

const Div = styled.div`
  margin: 20px 0;
`;

export default Sidebar
