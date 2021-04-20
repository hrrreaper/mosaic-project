import React from 'react';
import styled from "styled-components";
import Login from './Login';

const Header = () => {
  return (
    <Wrapper>
      <LoginDiv>
      <Login />
      </LoginDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 10vh;
  width: 98vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  
`;

const LoginDiv = styled.div`
  padding: 10px;
`;

export default Header;
