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
      {userObj.name ? <Div>Cheers, {userObj.givenName || userObj.givenName[0]}!</Div> : null}
      <Img src={userObj.imageUrl || userObj.imageUrl[0]} />
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
          className="google"
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

  @media (max-width: 768px) {
    font-size: .7rem;
  }
  
`;
const LoginDiv = styled.div`
  display: flex;
`;

const Div = styled.div`
`;

const Img = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin: 0 10px;

  @media (max-width: 768px) {
    /* display:none; */
    height: 20px;
  width: 20px;
  }
`;


export default Login;