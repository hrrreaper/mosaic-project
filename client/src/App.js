import React, { useContext }  from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyles";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import BeerDetails from "./components/Beer/BeerDetails";
import AllBeers from "./components/BeerViews/AllBeers";
import InStock from "./components/BeerViews/InStock";
import OnTap from "./components/BeerViews/OnTap";
import Breweries from "./components/Brewery/Breweries";
import styled from "styled-components";
import { UserContext } from './components/Context/UserProvider';
import MainSignIn from "./components/MainSignIn";
import AddBeer from "./components/AddBeer";
import ErrorPage from "./components/ErrorPage";


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
          <Route exact path="/beer/:_id">
            <BeerDetails />
          </Route>
          <Route exact path="/add/beer">
            <AddBeer />
          </Route>
          <Route exact path="/in-stock">
            <InStock />
          </Route>
          <Route exact path="/on-tap">
            <OnTap />
          </Route>
          <Route exact path="/breweries">
            <Breweries />
          </Route>
          <Route path="/beers/:page">
            <AllBeers  />
          </Route>
          <Route path="/error">
            <ErrorPage />
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
  @media (max-width: 500px) {
    width: 90px;
  }
`;

const MainGrid = styled.div`
  grid-area: main;
`;


export default App;
