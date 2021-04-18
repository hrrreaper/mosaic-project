import React from 'react';
import styled from 'styled-components';
import Login from './Header/Login';
import logo from '../assets/Mosaic-graphic.png';

const MainSignIn = () => {
  return (
    <Wrapper>
      <Img src={logo} />
      <LoginWrapper>
        <Div>
        Please Login:
        </Div>
      <Login/>
      </LoginWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,250,0,0.1);
`;

const Img = styled.img`
  max-height: 95vh;
`;

const Div = styled.div`
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: 700;
`;

const LoginWrapper = styled.div`
  position: absolute;
  z-index: 10;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 250px;
  height: 125px;
  padding: 30px;
  background-color: rgba(190,250,190,0.9);
  border-radius: 10px;
`;

export default MainSignIn;
