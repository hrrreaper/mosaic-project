import React, { useContext, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import Logout from './Logout';
import { UserContext } from './UserProvider';
const {GOOGLE_CLIENT} = process.env;


const Login = () => {
  const { userObj, handleLogin } = useContext(UserContext);

  // const { signIn } = useGoogleLogin({
  //   clientId,
  //   onSuccess,
  //   onFailure,
  //   isSignedIn:true,
  //   accessType: 'offline',
  // })

  
  return userObj !== undefined ? (
    <Wrapper>
      {userObj.name ? <div>Welcome, {userObj.name}</div> : null}
      <Img src={userObj.picture} />
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
`;
const LoginDiv = styled.div`
  display: flex;
  justify-content:flex-end;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin: 0 10px;
`;


export default Login;