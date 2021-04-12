import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import AllBeers from "./components/AllBeers";
import BeerDetails from "./components/BeerDetails.js";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/beers">
            <AllBeers />
          </Route>
          <Route path="/beer/:_id">
            <BeerDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
