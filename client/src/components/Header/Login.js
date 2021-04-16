import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import Logout from './Logout';
import { UserContext } from '../UserProvider';
const {GOOGLE_CLIENT} = process.env;


const Login = () => {
  const { userObj, handleLogin } = useContext(UserContext);
  
  return userObj ? (
    <Wrapper>
      {userObj[0].name ? <div>Hey, {userObj[0].name}!</div> : null}
      <Img src={userObj[0].picture} />
      <Logout />
    </Wrapper>
    
  ) : (
      <LoginDiv>
        <GoogleLogin
          clientId={GOOGLE_CLIENT}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
        />
      </LoginDiv>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
  align-items: center;
  font-size: .85rem;
`;
const LoginDiv = styled.div`
  display: flex;
  justify-content:flex-end;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin: 0 10px;
`;


export default Login;