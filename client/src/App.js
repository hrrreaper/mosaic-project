import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        {/* <Sidebar /> */}
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
