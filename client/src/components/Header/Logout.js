import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from '../Context/UserProvider';
const {GOOGLE_CLIENT} = process.env;

const Logout = () => {
  const { setUserObj } = useContext(UserContext);
  
  const onLogoutSuccess = () => {
    setUserObj();
    localStorage.removeItem('user');
  };

  return (
    <div>
      <GoogleLogout
        buttonText="logout"
        clientId={GOOGLE_CLIENT}
        onLogoutSuccess={onLogoutSuccess}
        style={{ borderRadius: "5px" }}
        icon={false}
        />
    </div>  
  )
}

export default Logout;