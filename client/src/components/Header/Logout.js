import React, { useContext } from 'react';
import { useGoogleLogout } from 'react-google-login';
import FormButton from '../Buttons/FormButton';
import { UserContext } from '../Context/UserProvider';
const {REACT_APP_GOOGLE_CLIENT} = process.env;

const Logout = () => {
  const { setUserObj } = useContext(UserContext);
  const clientId = REACT_APP_GOOGLE_CLIENT

  
  const onLogoutSuccess = () => {
    setUserObj();
    localStorage.removeItem('user');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess
  })

  return (
    <div>
      <FormButton onClick={signOut} >Logout</FormButton>
    </div>  
  )
}

export default Logout;