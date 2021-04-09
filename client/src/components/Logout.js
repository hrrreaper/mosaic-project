import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from './UserProvider';
const {GOOGLE_CLIENT} = process.env;


const Logout = () => {
  const { setUserObj } = useContext(UserContext);
  
  const onLogoutSuccess = () => {
    setUserObj();
  };

  return (
    <div>
      <GoogleLogout
        clientId={GOOGLE_CLIENT}
        onLogoutSuccess={onLogoutSuccess}
        />
    </div>  
  )
}

export default Logout;