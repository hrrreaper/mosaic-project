import React, { useContext }  from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyles";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import AllBeers from "./components/Beer/AllBeers";
import BeerDetails from "./components/Beer/BeerDetails.js";
import BeerForm from "./components/Beer/BeerForm";
import InStock from "./components/Beer/InStock";
import Breweries from "./components/Brewery/Breweries";
import styled from "styled-components";
import OnTap from "./components/OnTap";
import { UserContext } from './components/Context/UserProvider';
import MainSignIn from "./components/MainSignIn";

const App = () => {

  const { userObj } = useContext(UserContext);

  //redirects to the login page unless you are signed in (once you're signed in it saves your user info in local storage and the db)

  return (
    <Wrapper>
      <BrowserRouter>
        <GlobalStyle />
        {userObj && (
          <>
            
        <HeaderGrid>
        <Header />
        </HeaderGrid>
        <SidebarGrid>
          <SidebarDiv>
        <Sidebar />
          </SidebarDiv>
        </SidebarGrid>
          </>
        )}
        <MainGrid>
          <Switch>
            {userObj ? (
          <Route exact path="/">
            <Homepage />
            </Route>
            ) : (
                <Route exact path="/">
                <MainSignIn />
            </Route>
            )}
            {userObj ? (
              <>
          <Route exact path="/beers">
            <AllBeers />
            </Route>
            <Route exact path="/beers/:page">
              <AllBeers  />
            </Route>
          <Route path="/beer/:_id">
            <BeerDetails />
          </Route>
          <Route path="/add/beer">
            <BeerForm />
          </Route>
          <Route path="/in-stock">
            <InStock />
          </Route>
          <Route path="/on-tap">
            <OnTap />
          </Route>
          <Route path="/breweries">
            <Breweries />
                </Route>
            </>
            ) : (
                <Redirect to="/" />
            )}
          </Switch>
          </MainGrid>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header header header header"
    "sidebar main main main main";
  grid-template-columns: min-content auto;
`;

const HeaderGrid = styled.div`
  grid-area: header;
  display: inline;
  float: right;
  width: 60vw;
`;

const SidebarGrid = styled.div`
  grid-area: sidebar;
`;

const SidebarDiv = styled.div`
  position: sticky;
  z-index: 10;
  top: 0;
  width: 215px;
  height: 100vh;

  @media (max-width: 768px) {
    width: 110px;
  }
`;

const MainGrid = styled.div`
  grid-area: main;
`;


export default App;
