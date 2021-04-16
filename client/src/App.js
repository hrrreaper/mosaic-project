import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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


const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <GlobalStyle />
        <HeaderGrid>
        <Header />
        </HeaderGrid>
        <SidebarGrid>
          <SidebarDiv>
        <Sidebar />
          </SidebarDiv>
        </SidebarGrid>
        <MainGrid>
        <Switch>
          <Route exact path="/">
            <Homepage />
            </Route>
            
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
`;

const MainGrid = styled.div`
  grid-area: main;
`;


export default App;
