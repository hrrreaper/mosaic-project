import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import Logout from './Logout';
import { UserContext } from '../Context/UserProvider';
const {REACT_APP_GOOGLE_CLIENT} = process.env;


const Login = () => {
  const { userObj, handleLogin } = useContext(UserContext);
  
  return userObj ? (
    <Wrapper>
      {userObj[0].name ? <div>Cheers, {userObj[0].name}!</div> : null}
      <Img src={userObj[0].picture} />
      <Logout />
    </Wrapper>
    
  ) : (
      <LoginDiv>
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_CLIENT}
          buttonText="login with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          style={{borderRadius:"5px"}}
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