import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BeerProvider } from './components/Context/BeerProvider';
import { UserProvider } from "./components/Context/UserProvider";

ReactDOM.render(
  <UserProvider>
    <BeerProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </BeerProvider>
  </UserProvider>,
  document.getElementById('root')
);

