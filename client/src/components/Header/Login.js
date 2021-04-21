import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import styled, { keyframes } from 'styled-components';
import Logout from './Logout';
import { UserContext } from '../Context/UserProvider';
import Button from '../Buttons/Button';
import { IoBeerOutline } from 'react-icons/io5';

const { REACT_APP_GOOGLE_CLIENT } = process.env;


const Login = () => {

  const { userObj, handleLogin } = useContext(UserContext);
  const clientId = REACT_APP_GOOGLE_CLIENT
  const onSuccess = handleLogin
  const onFailure = handleLogin
  const cookiePolicy = 'single_host_origin'
  const { signIn } = useGoogleLogin({
    clientId,
    onSuccess,
    onFailure,
    cookiePolicy
  })
  return userObj ? (
    <Wrapper>
      {userObj.name ? <Div> <IoBeerOutline className="beer" size={18}/> Cheers, {userObj.givenName || userObj.givenName[0]}!  </Div> : null}
      <Img src={userObj.imageUrl || userObj.imageUrl[0]} />
      <Logout />
    </Wrapper>
    
  ) : (
      <LoginDiv>
        <Button onClick={signIn} >Login with Google</Button>
      
      </LoginDiv>
  )
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
  align-items: center;
  font-size: .9rem;

  @media (max-width: 768px) {
    font-size: .7rem;
  }
  
`;
const LoginDiv = styled.div`
  display: flex;
`;

const rock = keyframes`
  0% {
    transform: rotate(15deg);
  }

  50% {
    transform: rotate(-20deg);
  }

  100% {
    transform: rotate(15deg);
  }
`;


const Div = styled.div`
  text-transform: lowercase;
  display: flex;
  align-items: center;

  .beer{
    color: gold;
    margin-right: 4px;
    animation: ${rock} 2s ease-in-out forwards infinite;
    }
`;

const Img = styled.img`
  border-radius: 50%;
  height: 35px;
  width: 35px;
  margin: 0 6px;

  @media (max-width: 768px) {
    height: 20px;
    width: 20px;
  }
`;


export default Login;