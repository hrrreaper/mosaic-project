import React from 'react';
import styled from "styled-components";
import Login from './Login';

const Header = () => {
  return (
    <Wrapper>
      <Title>  </Title>
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
  justify-content: flex-end;
`;

const Title = styled.h1`

`;

const LoginDiv = styled.div`
  padding: 10px;
`;

export default Header;
