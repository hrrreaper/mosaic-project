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
        Please Login to continue:
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
  max-height: 96vh;
`;

const Div = styled.div`
  text-transform: lowercase;
  font-weight: 700;
  padding-top: 15px;
  text-align: center;
`;

const LoginWrapper = styled.div`
  position: absolute;
  z-index: 10;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 275px;
  height: 150px;
  padding: 30px;
  background-color: rgba(235, 235, 187, 0.6);
  border-radius: 20px;
`;

export default MainSignIn;
