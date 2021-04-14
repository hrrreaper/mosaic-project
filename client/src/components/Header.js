import React from 'react';
import styled from "styled-components";
import Login from './Login';
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <Wrapper>
      <SearchBar />
      <LoginDiv>
      <Login />
      </LoginDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 10vh;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 180px;
`;


const LoginDiv = styled.div`
  padding: 10px;
`;

export default Header;
